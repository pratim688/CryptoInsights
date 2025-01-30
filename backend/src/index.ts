import authRouter from './routes/auth.routes';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import blogRouter from './routes/blog.routes';
import connectToDatabase from './config/db';
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = 5000;
const corsOptions = {
  origin: [`http://localhost:5173`, `http://localhost:5174`],
  methods: "GET,POST,PATCH,DELETE,PUT",
  allowedHeaders: "Content-Type, Authorization ,x-requested-with", 
  credentials: true,
}
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/uploads', express.static('public/uploads'));
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/auth", authRouter);
// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDatabase()
});
