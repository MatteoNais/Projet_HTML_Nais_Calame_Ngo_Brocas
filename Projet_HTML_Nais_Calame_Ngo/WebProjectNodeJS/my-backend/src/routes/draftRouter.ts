import express from "express";
import { getDraftById } from "../controllers/draftController";

const router = express.Router();

router.get("/id/:id", getDraftById);
export default router;