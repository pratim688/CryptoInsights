import mongoose, { Schema, Document } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

// Interface defining the User document
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  blogHistory?: string[];
  image?: string;
  lastLogin?: Date;
}

// Define the schema with the necessary fields and default values
const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default:"author",
    },
    blogHistory: { type: [String], default: [] },
    image: { type: String, default: "https://example.com/default-image.png" },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
