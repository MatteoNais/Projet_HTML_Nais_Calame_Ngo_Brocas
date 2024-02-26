import express from "express";
import { getCurrentDraft, getDraftById, getPlayersDrafted, getPlayersDraftedByDraft, createDraft, getDraftByIdAndLigue } from "../controllers/draftController";

const router = express.Router();

router.get("/id/:id", getDraftById);
router.get("/ligue/:id", getCurrentDraft);
router.get("/players_drafted/", getPlayersDrafted);
router.get("/players_drafted_by_draft/:id_draft", getPlayersDraftedByDraft);
router.get("/ligue/:id/:id_draft", getDraftByIdAndLigue);
router.post("/create", createDraft);
export default router;