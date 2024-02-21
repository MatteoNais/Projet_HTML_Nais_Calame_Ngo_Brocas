import { Request, Response } from "express";
import Draft, { IDraft } from "../models/Draft";
import Pick from "../models/Pick";

const getDraftById = async (req: Request, res: Response) => {
    console.log(req.params);
    const draftId = parseInt(req.query.draftId as string);
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }
    const draft = await Draft.findDraftById(draftId);
    res.status(200).json(draft);
    console.log(draft);
};

const getCurrentDraft = async (req: Request, res: Response) => {
    console.log(req.params);
    const ligueId = req.params.id.toString();
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid ligue ID" });
    }
    const draft = await Draft.findCurrentDraft(ligueId);
    res.status(200).json(draft);
};

const getPlayersDrafted = async (req: Request, res: Response) => {
    console.log(req.params);
    const players_drafted = await Draft.findDraftedPlayers();
    //const players_drafted = await Pick.findAllPicks();
    res.status(200).json(players_drafted);
}

export { getDraftById, getCurrentDraft, getPlayersDrafted };