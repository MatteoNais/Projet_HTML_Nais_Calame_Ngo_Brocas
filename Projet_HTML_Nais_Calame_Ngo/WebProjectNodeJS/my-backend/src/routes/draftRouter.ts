import express from "express";
import { getCurrentDraft, getDraftById, getPlayersDrafted } from "../controllers/draftController";

const router = express.Router();

router.get("/id/:id", getDraftById);
router.get("/ligue/:id", getCurrentDraft);
router.get("/players_drafted/", getPlayersDrafted);
export default router;