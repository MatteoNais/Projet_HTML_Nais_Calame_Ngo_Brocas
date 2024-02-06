import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { generateToken, clearToken } from "../utils/auth";

const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOneByEmail(email);

    if (userExists) {
        res.status(400).json({ message: "The user already exists" });
    }

    const newUser: IUser = { username, email, password };
    const userInstance = new User(newUser);
    const savedRows = await userInstance.save();


    if (savedRows) {
        generateToken(res, userInstance.getId().toString());
        return res.status(201).json({
            id: userInstance.getId().toString(),
            username: userInstance.getUsername(),
            email: userInstance.getEmail(),
        });
    } else {
        res.status(400).json({ message: "An error occurred in creating the user" });
    }
};

const authenticateUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOneByEmail(email);

    if (user && (await user.comparePassword(password))) {
        generateToken(res, user.getId().toString());
        res.status(201).json({
            id: user.getId().toString(),
            username: user.getUsername(),
            email: user.getEmail(),
        });
    } else {
        res.status(401).json({ message: "User not found / password incorrect" });
    }
};

const logoutUser = (req: Request, res: Response) => {
    clearToken(res);
    res.status(200).json({ message: "User logged out" });
};

export { registerUser, authenticateUser, logoutUser };