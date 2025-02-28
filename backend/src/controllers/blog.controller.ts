import { Request, Response } from "express";
import {catchErrors} from "../utils/catchErrors";
import multer from "multer";
import { BlogSchema } from "../validation/blog.validation";
import Blog from "../models/blog.model";
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constant/http";
import appAssert from "../utils/AppAssert";
import AppErrorCode from "../constant/AppErrorCode";
import User from "../models/users";
import jwt from "jsonwebtoken";
//import { Types } from "mongoose";
import cacheInstance from "../cache/cacheInstance";
import getMacAddress from "../utils/macAddress";
import { EditBlogSchema } from "../validation/editblog.validation";

export const CreateBlog = catchErrors(async (req: Request, res: Response) => {
    const { title, banner, description, content, tags } = req.body;
   
    //return
    const accessToken = req.cookies.authToken;

    // Ensure access token is present
    appAssert(accessToken, FORBIDDEN, "No access token provided", AppErrorCode.NoTokenProvided);

    // Verify and decode the access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as jwt.JwtPayload;
    console.log(decoded)
    // Extract userId from the decoded token
    const userId = decoded.userId;
    appAssert(userId, FORBIDDEN, "Invalid token: user ID missing", AppErrorCode.InvalidToken);

    const user = await User.findById(userId).select("name email role blogHistory");
    appAssert(user, NOT_FOUND, "User not found", AppErrorCode.UserNotFound);

    const blogData = {
        blog_id: `${title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")}-${Math.random().toString(36).substring(2, 15)}`,
        title,
        banner,
        des: description,
        content: [content],
        tags,
        author: userId,
        activity: {
            total_likes: 0,
            total_comments: 0,
            total_reads: 0,
            total_parent_comments: 0
        },
        comments: [],
        draft: false
    };

    const validatedBlogData = BlogSchema.parse(blogData);

    const dbData = await new Blog(validatedBlogData).save();

    user.blogHistory = user.blogHistory || [];
    user.blogHistory.push(blogData.blog_id);
    await user.save();

    // Clear all paginated blog list caches
   
    res.status(OK).json(dbData);
});


// Get a specific blog by ID
export const GetBlog = catchErrors(async (req: Request, res: Response) => {
    const macAddress = await getMacAddress();

    const { blog_id } = req.params; // Extract blogId from request params

    // Find the blog by blog_id (exact match)
    const blog = await Blog.findOne({ blog_id: blog_id }).populate("author", "email role _id name");
    appAssert(blog, NOT_FOUND, "Blog not found", AppErrorCode.BlogNotFound);

    // Check if the current device has liked this blog
    const likedByMac = blog.likedByDevices.indexOf(macAddress);
    const likedOrNot = likedByMac === -1 ? false : true;

    // Convert the Mongoose document to a plain object
    const blogObject = blog.toObject();

    res.status(OK).json({ ...blogObject, likedOrNot });
});

//func to delete the cache of category blogs
function deleteMatchingKeys() {
    const keys = cacheInstance.keys(); // Get all keys from the cache
    const pattern = /^blogs:page:\d+:limit:\d+:category:(.*)$/; // Regular expression to match keys

    keys.forEach((key:any) => {
        if (pattern.test(key)) {
            cacheInstance.del(key); // Delete key if it matches the pattern
            console.log(`Deleted key: ${key}`);
        }
    });
}


//get all blogs based on categories
export const GetAllBlogs = catchErrors(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string | undefined;
    const cacheKey = `blogs:page:${page}:limit:${limit}:category:${category || "all"}`;

    // Check if data is in cache
  

    const skip = (page - 1) * limit;

    // Build query filter based on category
    const filter: Record<string, any> = {};
    if (category) {
        filter.tags = { $in: [category] }; // Match blogs where tags array contains the category
    }
   

    // Get total count for pagination
    const totalBlogs = await Blog.countDocuments(filter);
   
    // Get paginated blogs
    const blogs = await Blog.find(filter)
        .select("-content") // Exclude content field
        .populate("author", "name") 
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip(skip)
        .limit(limit);

    appAssert(blogs.length > 0, NOT_FOUND, "No blogs found", AppErrorCode.BlogsNotFound);

    // Convert Mongoose documents to plain objects
    const plainBlogs = blogs.map((blog) => blog.toObject());

    const data = {
        blogs: plainBlogs,
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs,
        hasMore: page * limit < totalBlogs
    };

   

    return res.status(OK).json(data);
});

// Update a blog by ID
export const UpdateBlog = catchErrors(async (req: Request, res: Response) => {
    const {id} = req.params;

    const { title, banner, description, content,tags } = req.body;
    const blogData = {
        title,
        banner,
        des: description,
        content: [content],
        tags,
    };
    const blogSchemaValidation = EditBlogSchema.safeParse(blogData);

    appAssert(blogSchemaValidation.success, BAD_REQUEST, "Content validation failed", AppErrorCode.BlogValidationFailed);

    const updatedBlog = await Blog.findOneAndUpdate({ blog_id: id }, blogSchemaValidation.data, { new: true }).populate("author", "email role _id name");
    
    //const blogedit = await Blog.findOne()
    appAssert(updatedBlog, NOT_FOUND, "Blog not found", AppErrorCode.BlogNotFound);





    res.status(OK).json(updatedBlog);
});

// Delete a blog by ID
export const DeleteBlog = catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    // Find the blog to get the author ID
    const blog = await Blog.findOne({blog_id:id});
    appAssert(blog, NOT_FOUND, "Blog not found", AppErrorCode.BlogNotFound);

    // Delete the blog
    await Blog.findOneAndDelete({blog_id:id});

    // Remove the blog ID from the author's blogHistory
    if (blog.author) {
        await User.findByIdAndUpdate(blog.author, { $pull: { blogHistory: blog._id } }, { new: true });
    }
    // Clear all paginated blog list caches
    const keys = cacheInstance.keys();
    keys.forEach((key:any) => {
        if (key.startsWith('blogs:')) {
            cacheInstance.del(key);
        }
    });


    res.status(OK).json({ message: "Blog deleted successfully" });
});

// Configure Multer storage with proper file naming and storage location
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

export const UploadFile = catchErrors(async (req: Request, res: Response): Promise<void> => {
    try {
        appAssert(req.file, BAD_REQUEST, "No file uploaded", AppErrorCode.BlogContentRequired);

        // Create full URL for the uploaded image
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Respond with the image URL and additional file details
        res.json({
            success: 1,
            file: {
                url: imageUrl,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
});

// Function to toggle like on a blog
export const toggleLikeBlog = catchErrors(async (req: Request, res: Response) => {
    const { blog_id } = req.params;
    const macAddress = await getMacAddress();

    if (!macAddress) {
        return res.status(BAD_REQUEST).json({ message: 'Device MAC address is missing!' });
    }

    // Find the blog by blog_id
    const blog = await Blog.findOne({ blog_id });

    if (!blog) {
        return res.status(NOT_FOUND).json({ message: 'Blog not found' });
    }

    // Initialize likedByDevices if not present
    blog.likedByDevices = blog.likedByDevices || [];

    // Check if the blog is already liked by the device
    if (blog.likedByDevices.includes(macAddress)) {
        return res.status(OK).json({
            message: 'Already liked',
            totalLikes: blog.activity.total_likes,
            hasLiked: true,
        });
    }

    // Add the MAC address and increment total likes
    blog.likedByDevices.push(macAddress);
    blog.activity.total_likes += 1;

    try {
        await blog.save();
        cacheInstance.del(`blog:id:${blog_id}`);
        cacheInstance.del(`blog:${blog_id}`);
        deleteMatchingKeys();
        return res.status(OK).json({
            message: 'Blog liked successfully',
            totalLikes: blog.activity.total_likes,
            hasLiked: true,
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: 'Failed to update blog like',
            error,
        });
    }
});

import mongoose from "mongoose";

export const UserBlogHistory = catchErrors(async (req: Request, res: Response) => {
  const accessToken = req.cookies.authToken;

  // Ensure access token is present
  appAssert(accessToken, FORBIDDEN, "No access token provided", AppErrorCode.NoTokenProvided);

  // Verify and decode the access token
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as jwt.JwtPayload;
  // Extract userId from the decoded token
  const userId = decoded.userId;
  appAssert(userId, FORBIDDEN, "Invalid token: user ID missing", AppErrorCode.InvalidToken);

  // Convert userId to ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId);
console.log(userObjectId)
  // Fetch blogs
  const Blogs = await Blog.find({ author: userObjectId }).select("blog_id title des updatedAt");
  appAssert(Blogs && Blogs.length > 0, NOT_FOUND, "Blogs not found", AppErrorCode.BlogNotFound);

  res.status(OK).json({ message: "Blogs fetched successfully", Blogs });
});




export const multerUpload = upload.single("image");

