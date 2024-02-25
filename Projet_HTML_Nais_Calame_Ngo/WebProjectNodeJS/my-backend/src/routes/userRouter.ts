import express from "express";
import { getUser, getUsersByIdLigues, findScoreOfUsersByLigueId } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getUser);
router.get("/ligue/:id_ligue", getUsersByIdLigues);
router.get("/findScore/:id_ligue", findScoreOfUsersByLigueId);
export default router;  