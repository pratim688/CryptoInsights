import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/register", (req, res, next) => {
    RegisterUser(req, res, next).catch(next);
});
authRouter.post("/login", (req, res, next) => {
    LoginUser(req, res, next).catch(next);
});

export default authRouter;