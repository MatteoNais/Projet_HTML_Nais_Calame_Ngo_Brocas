import { Request, Response } from "express";
import Draft, { IDraft } from "../models/Draft";
import Pick from "../models/Pick";

const getDraftById = async (req: Request, res: Response) => {
    console.log(req.params);
    const draftId = parseInt(req.params.id as string);
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }
    const draft = await Draft.findDraftById(draftId);
    res.status(200).json(draft);
    console.log(draft);
};

const getCurrentDraft = async (req: Request, res: Response) => {
    console.log(req.params);
    const ligueId = req.params.id;
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid ligue ID" });
    }
    const draft = await Draft.findCurrentDraft(ligueId);
    res.status(200).json(draft);
};

const getDraftByIdAndLigue = async (req: Request, res: Response) => {
    console.log(req.params);
    const ligueId = req.params.id;
    const draftId = req.params.id_draft;
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid ligue ID" });
    }
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }
    const draft = await Draft.findDraftByLigueIdAndDraftId(ligueId, draftId);
    res.status(200).json(draft);
}

const getDraftByIdAndLigue2 = async (req: Request, res: Response) => {
    console.log(req.params);
    const ligueId = req.params.id;
    const draftId = req.params.id_draft;
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid ligue ID" });
    }
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }
    const draft = await Draft.findDraftByLigueIdAndDraftId2(ligueId, draftId);
    res.status(200).json(draft);
}

const getPlayersDraftedByDraft = async (req: Request, res: Response) => {
    console.log(req.params);
    const draftId = req.params.id_draft;
    const players_drafted = await Draft.findDraftedPlayersByDraft(draftId);
    //const players_drafted = await Pick.findAllPicks();
    res.status(200).json(players_drafted);
}

const getPlayersDrafted = async (req: Request, res: Response) => {
    console.log(req.params);
    const players_drafted = await Draft.findDraftedPlayers();
    //const players_drafted = await Pick.findAllPicks();
    res.status(200).json(players_drafted);
}

const createDraft = async (req: Request, res: Response) => {
    console.log(req.body);

    const ligueId = req.body.ligueId;
    const date_debut = req.body.date_debut;
    console.log(date_debut);
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid ligue ID" });
    }
    if (date_debut === null || date_debut === undefined) {
        return res.status(400).json({ message: "Invalid date_debut" });
    }
    const draft = await Draft.createDraft(ligueId, date_debut);
    res.status(200).json(draft);
}

export { getDraftById, getCurrentDraft, getPlayersDrafted, getPlayersDraftedByDraft, createDraft, getDraftByIdAndLigue, getDraftByIdAndLigue2 };