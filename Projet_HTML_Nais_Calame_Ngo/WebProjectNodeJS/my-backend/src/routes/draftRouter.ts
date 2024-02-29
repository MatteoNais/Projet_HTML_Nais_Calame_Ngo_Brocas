import express from "express";
import { getCurrentDraft, getDraftById, getPlayersDrafted, getPlayersDraftedByDraft, createDraft, getDraftByIdAndLigue, getDraftByIdAndLigue2 } from "../controllers/draftController";

const router = express.Router();

router.get("/id/:id", getDraftById);
router.get("/ligue/:id", getCurrentDraft);
router.get("/players_drafted/", getPlayersDrafted);
router.get("/players_drafted_by_draft/:id_draft", getPlayersDraftedByDraft);
router.get("/ligue/:id/:id_draft", getDraftByIdAndLigue); // pour la page equipe
router.get("/ligue2/:id/:id_draft", getDraftByIdAndLigue2); // pour la page draft
router.post("/create", createDraft);
export default router;