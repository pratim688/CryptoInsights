import { Request, Response } from "express";
import User from "../models/users";
import { catchErrors } from "../utils/catchErrors";
import { hashValue, compareValue } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import cacheInstance from "../cache/cacheInstance";
import {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
} from "http-status-codes";
import AppErrorCode from "../constant/AppErrorCode";
import appAssert from "../utils/AppAssert";

// Register a new user
export const RegisterUser = catchErrors(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  appAssert(
    !existingUser,
    BAD_REQUEST,
    "Email is already in use",
    AppErrorCode.EmailAlreadyExists
  );

  // Hash the password
  const hashedPassword = await hashValue(password);

  // Create and save the new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  res.status(CREATED).json({ message: "User registered successfully" });
});

// Log in a user
export const LoginUser = catchErrors(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  appAssert(user, NOT_FOUND, "User not found", AppErrorCode.UserNotFound);

  // Compare the passwords
  const isPasswordMatch = await compareValue(password, user.password);
  appAssert(
    isPasswordMatch,
    UNAUTHORIZED,
    "Invalid credentials",
    AppErrorCode.PasswordMismatch
  );

  // Generate a JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  // Send the token as a cookie
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ← false locally
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ← works with HTTP
    maxAge: 24 * 60 * 60 * 1000,
  });
  

  res.status(OK).json({ message: "Login successful", user: user });
});

// Get user details by ID
export const GetUserDetails = catchErrors(
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const cacheKey = `user:${user_id}`;

    // Check if user details are in cache
    const cachedUser = cacheInstance.get(cacheKey);
    if (cachedUser) {
      return res.status(OK).json(cachedUser);
    }

    // Find the user by ID
    const user = await User.findById(user_id).select("-password");
    appAssert(user, NOT_FOUND, "User not found", AppErrorCode.UserNotFound);

    // Store user details in cache
    cacheInstance.set(cacheKey, user);
    res.status(OK).json(user);
  }
);

// Update user profile
export const UpdateUserProfile = catchErrors(
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { name, email, image } = req.body;

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { name, email, image },
      { new: true, runValidators: true }
    ).select("-password");
    appAssert(
      updatedUser,
      NOT_FOUND,
      "User not found",
      AppErrorCode.UserNotFound
    );

    res.status(OK).json({ message: "User profile updated", updatedUser });
  }
);

// Delete user
export const DeleteUser = catchErrors(async (req: Request, res: Response) => {
  const { user_id } = req.params;

  // Find and delete the user
  const deletedUser = await User.findByIdAndDelete(user_id);
  appAssert(
    deletedUser,
    NOT_FOUND,
    "User not found",
    AppErrorCode.UserNotFound
  );

  res.status(OK).json({ message: "User deleted successfully" });
});
