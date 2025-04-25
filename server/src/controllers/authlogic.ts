import { Request, Response } from "express";
import { UserModel } from "../models/db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";

// Route 1: User Signup
const signup = async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({ username, password });

        res.status(200).json({
            message: "User signed up",
        });
    } catch (error) {
        res.status(411).json({
            message: "User already exists",
        });
    }
};

// Route 2: User Signin
const signin = async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

        res.status(200).json({ token });
    } else {
        res.status(403).json({
            message: "Incorrect Credentials",
        });
    }
};

// Exporting at the end
export { signup, signin };
