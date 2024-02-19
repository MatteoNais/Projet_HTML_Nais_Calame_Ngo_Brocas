import express from "express";
import { getCurrentDraft, getDraftById } from "../controllers/draftController";

const router = express.Router();

router.get("/id/:id", getDraftById);
router.get("/ligue/:id", getCurrentDraft);
export default router;