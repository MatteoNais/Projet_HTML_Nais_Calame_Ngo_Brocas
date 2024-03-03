import { Request, Response } from "express";
import Ligue, { ILigue } from "../models/Ligue";

const getLigueById = async (req: Request, res: Response) => {
    const ligueId = req.params.id as string; // Ensure ligueId is of type string
    console.log("ligueId : ", ligueId);
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    const ligue = await Ligue.findById(ligueId);
    res.status(200).json(ligue);
    console.log(ligue);
};

const createLigue = async (req: Request, res: Response) => {
    const nom = req.body.nom;
    const userId = req.body.userId;
    console.log(nom);
    console.log(userId);
    if (userId === null || userId === undefined || nom === null || nom === undefined) {
        return res.status(400).json({ message: "Invalid user ID ou nom" });
    }
    const newILigue: ILigue = { nom };
    const newLigue: Ligue | null = await Ligue.create(newILigue, userId);
    if (newLigue) {
        return (res.status(201).json(
            {
                id: newLigue.getId(),
                nom: newLigue.getNom()
            }
        ));
    }
    else {
        res.status(400).json({ message: "An error occurred in creating the user" });
    }
};

const getLiguesByUserId = async (req: Request, res: Response) => {
    const userId = req.user?._id;

    if (userId === null || userId === undefined) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    const ligues = await Ligue.findLiguesByUserId(userId);

    if (!ligues) {
        res.status(400);
    }
    res.status(200).json(ligues);
};

const inscriptionLigue = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const code_access = req.body.code_access;
    console.log(code_access);
    console.log(userId);
    if (userId === null || userId === undefined) {
        console.log("Invalid user ID");
        return res.status(400).json({ message: "Invalid user ID" });
    }
    if (code_access === null || code_access === undefined) {
        console.log("Invalid code_access");
        res.status(400).json({ message: "Invalid code_access" });
    }
    const row = await Ligue.inscriptionLigue(code_access, userId);
    if (row) {
        return res.status(201).json(
            {
                userId: userId,
                code_access: code_access,
            }

        );
    }
    res.status(400).json({ message: "An error occurred in inscription of the user" });
};

export { getLigueById, createLigue, getLiguesByUserId, inscriptionLigue };