import { Request, Response } from "express";
import Draft, { IDraft } from "../models/Draft";

const getDraftById = async (req: Request, res: Response) => {
    const draftId = parseInt(req.query.draftId as string);
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }
    const draft = await Draft.findDraftById(draftId);
    res.status(200).json(draft);
    console.log(draft);
};

export {getDraftById};