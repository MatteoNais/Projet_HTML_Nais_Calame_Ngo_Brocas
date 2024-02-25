import { Request, Response } from "express";
import User from "../models/User";

const getUser = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (userId === null || userId === undefined) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId, "username, email");

    if (!user) {
        res.status(400);
    }

    res.status(200).json(user);
};

const getUsersByIdLigues = async (req: Request, res: Response) => {
    const ligueId = req.params.id_ligue;
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findUsersByLigueId(ligueId);

    if (!user) {
        res.status(400);
    }
    res.status(200).json(user);
};

const findScoreOfUsersByLigueId = async (req: Request, res: Response) => {

    const ligueId = req.params.id_ligue;
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const users = await User.findScoreOfUsersByLigueId(ligueId);

    if (!users) {
        res.status(400);
    }
    res.status(200).json(users);
}
export { getUser, getUsersByIdLigues, findScoreOfUsersByLigueId };