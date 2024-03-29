import { Request, Response } from "express";
import Equipe, { IEquipe } from "../models/Equipe";

const createEquipe = async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const ligue = req.body.ligue
        const utilisateur = req.body.utilisateur
        const nom = req.body.nom

        const result = await Equipe.create(ligue, utilisateur, nom);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);;
    }
};

const getEquipeById = async (req: Request, res: Response) => {
    const equipeId = req.params.equipe_id.toString();

    if (equipeId === null || equipeId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const equipe = await Equipe.getEquipeById(equipeId);

    res.status(200).json(equipe);
};

const getEquipesByLigue = async (req: Request, res: Response) => {
    const ligueId = req.params.ligue_id.toString();

    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const equipe = await Equipe.getEquipesByLigue(ligueId);

    res.status(200).json(equipe);
};

const getEquipesByLigueAndByDraft = async (req: Request, res: Response) => {
    const ligueId = req.params.ligue_id.toString();
    const draftId = req.params.draft_id.toString();

    if (ligueId === null || ligueId === undefined || draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const equipe = await Equipe.getEquipesByLigueAndByDraft(ligueId, draftId);

    res.status(200).json(equipe);
};

const getEquipeByLigueAndUser = async (req: Request, res: Response) => {
    const ligueId = req.params.ligue_id.toString();
    const userId = req.params.user_id.toString();

    if (ligueId === null || ligueId === undefined || userId === null || userId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID or user ID" });
    }
    const equipe = await Equipe.getEquipeByLigueAndUser(ligueId, userId);

    res.status(200).json(equipe);
};

const getEquipeByLigueAndUserAndDraft = async (req: Request, res: Response) => {
    const ligueId = req.params.ligue_id.toString();
    const userId = req.params.user_id.toString();
    const draftId = req.params.draft_id.toString();

    if (ligueId === null || ligueId === undefined || userId === null || userId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID or user ID" });
    }
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }
    const equipe = await Equipe.getEquipeByLigueAndUserAndDraft(ligueId, userId, draftId);

    res.status(200).json(equipe);
};

const updateScoreEquipe = async (req: Request, res: Response) => {
    console.log("rentre");
    const ligueId = req.params.ligue_id.toString();

    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const result = await Equipe.updateScoreEquipe(ligueId);

    res.status(200).json(result);
}

const getEquipesByUtilisateur = async (req: Request, res: Response) => {
    const userId = req.params.utilisateur_id.toString();

    if (userId === null || userId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const equipe = await Equipe.getEquipesByUtilisateur(userId);

    res.status(200).json(equipe);
};

const addJoueurNBA = async (req: Request, res: Response) => {
    const joueurID = req.params.id.toString();
    const equipeId = req.params.equipe_id.toString();

    if (joueurID === null || joueurID === undefined) {
        return res.status(400).json({ message: "Invalid NBA player ID" });
    }
    const result = await Equipe.addJoueurNBA(equipeId, joueurID);

    res.status(200).json(result);
};

const removeJoueurNBA = async (req: Request, res: Response) => {
    const equipeId = req.params.equipe_id.toString();
    const joueurID = req.params.id.toString();

    if (joueurID === null || joueurID === undefined) {
        return res.status(400).json({ message: "Invalid NBA player ID" });
    }
    const result = await Equipe.removeJoueurNBA(equipeId, joueurID);

    res.status(200).json(result);
};

const replaceJoueurNBA = async (req: Request, res: Response) => {
    const equipeId = req.params.equipe_id.toString();
    const NEWjoueurID = req.params.new_id.toString();
    const OLDjoueurID = req.params.old_id.toString();

    if (NEWjoueurID === null || NEWjoueurID === undefined || OLDjoueurID === null || OLDjoueurID === undefined) {
        return res.status(400).json({ message: "Invalid NBA player ID" });
    }
    const result = await Equipe.replaceJoueurNBA(equipeId, NEWjoueurID, OLDjoueurID);

    res.status(200).json(result);
};

const getHistorique = async (req: Request, res: Response) => {
    const equipeId = req.params.equipe_id.toString();

    if (equipeId === null || equipeId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const historique = await Equipe.getHistorique(equipeId);

    res.status(200).json(historique);
};




export { updateScoreEquipe, getEquipeById, getEquipesByUtilisateur, getEquipeByLigueAndUserAndDraft, getEquipeByLigueAndUser, addJoueurNBA, removeJoueurNBA, replaceJoueurNBA, getHistorique, createEquipe, getEquipesByLigue, getEquipesByLigueAndByDraft };