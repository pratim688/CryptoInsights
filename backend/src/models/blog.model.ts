import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces for the sub-documents
interface Block {
  id: string;
  type: string;
  data: {
    text: string;
    style: string;
    items: string[];
    file?: {
      url: string;
      caption?: string; 
    };
  };
}

interface Content {
  time: number;
  blocks: Block[];
  version: string;
}

interface Activity {
  total_likes: number;
  total_comments: number;
  total_reads: number;
  total_parent_comments: number;
}

// Define the main document interface
export interface BlogDocument extends Document {
  blog_id: string;
  title: string;
  banner: string;
  des: string;
  content: Content[];
  tags: string[];
  author?: mongoose.Types.ObjectId;
  activity: Activity;
  comments: mongoose.Types.ObjectId[];
  draft: boolean;
  likedByDevices: string[]; 
}

// Define the schema
const BlogSchema = new Schema<BlogDocument>(
  {
    blog_id: { type: String, required: true },
    title: { type: String, required: true },
    banner: { type: String, required: true },
    des: { type: String, required: true },
    content: {
      type: [
        {
          time: { type: Number, required: true },
          blocks: [
            {
              id: { type: String, required: true },
              type: { type: String, required: true },
              data: {
                text: { type: String },
                file: {
                  url: { type: String },
                  caption: { type: String }, 
                },
                style: { type: String },
                items: [
                  {
                    content: { type: String }, // Each item has a `content` string
                    items: { type: Array, default: [] }, // Nested items (array of any type)
                    meta: { type: Object }, // Optional metadata object
                  },
                ],
              },
            },
          ],
          version: { type: String, required: true },
        },
      ],
      default: [],
    },
    tags: { type: [String], default: [] },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    activity: {
      total_likes: { type: Number, default: 0 },
      total_comments: { type: Number, default: 0 },
      total_reads: { type: Number, default: 0 },
      total_parent_comments: { type: Number, default: 0 },
    },
    comments: { type: [mongoose.Types.ObjectId], ref: 'Comment', default: [] }, 
    draft: { type: Boolean, default: false },
    likedByDevices: { type: [String], default: [] }, 
  },
  {
    timestamps: true, 
  }
);

// Export the model
const Blog = mongoose.model<BlogDocument>('Blog', BlogSchema);
export default Blog;
