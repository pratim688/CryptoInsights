import { Router } from "express";
import { CreateBlog, DeleteBlog, GetAllBlogs, GetBlog, multerUpload, toggleLikeBlog, UpdateBlog, UploadFile, UserBlogHistory } from "../controllers/blog.controller";

// Define the extended request type properly
interface DeviceInfo {
    ip?: string;
    macAddress?: string;
  }
  
export interface ExtendedRequest extends Request {
    session?: {
      deviceInfo?: DeviceInfo;
    };
  }
const blogRouter = Router();

// for users to get all blogs

//for getting all blogs
blogRouter.get("/user/getblogs", (req, res, next) => {
  GetAllBlogs(req, res, next).catch(next);
});



//for creating a blog
blogRouter.post("/createblog", (req, res, next) => {
    CreateBlog(req, res, next).catch(next);
});

//for getting all blogs
blogRouter.get("/getblogs",  (req, res, next) => {
    GetAllBlogs(req, res, next).catch(next);
});

//for getting all blogs
// blogRouter.get("/getblogsbyCategories", (req, res, next) => {
//   GetAllBlogbyCategories(req, res, next).catch(next);
// });

//for getting a specific blog
blogRouter.get("/getblogs/:blog_id", (req, res, next) => {
    GetBlog(req, res, next).catch(next);
});

//for updating a specific blog
blogRouter.put("/updateblog/:id", (req, res, next) => {
    UpdateBlog(req, res, next).catch(next);
});

//for deleting a specific blog
blogRouter.delete("/deleteblog/:id", (req, res, next) => {
    DeleteBlog(req, res, next).catch(next);
});
// Route for file upload
blogRouter.post("/uploadFile", multerUpload, (req, res, next) => {
    UploadFile(req, res, next).catch(next);
});
// Route to toggle like/unlike a blog
blogRouter.post('/:blog_id/toggle-like', (req,res,next) => {
  toggleLikeBlog(req,res,next).catch(next);
});

blogRouter.get('/user-blog-history', (req,res,next) => {
  UserBlogHistory(req,res,next).catch(next);
});


export default blogRouter;
