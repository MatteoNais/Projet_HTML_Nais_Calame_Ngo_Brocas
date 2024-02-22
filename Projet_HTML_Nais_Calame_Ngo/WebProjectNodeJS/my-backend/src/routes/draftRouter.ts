import express from "express";
import { getCurrentDraft, getDraftById, getPlayersDrafted, createDraft } from "../controllers/draftController";

const router = express.Router();

router.get("/id/:id", getDraftById);
router.get("/ligue/:id", getCurrentDraft);
router.get("/players_drafted/", getPlayersDrafted);
router.post("/create", createDraft);
export default router;