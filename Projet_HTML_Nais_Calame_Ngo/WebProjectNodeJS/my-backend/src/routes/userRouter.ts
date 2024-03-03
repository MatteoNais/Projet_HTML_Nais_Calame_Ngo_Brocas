import express from "express";
import { getUser, getUsersByIdLigues, findScoreOfUsersByLigueId, getUserById } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getUser);
router.get("/id/:id", getUserById);
router.get("/ligue/:id_ligue", getUsersByIdLigues);
router.get("/findScore/:id_ligue", findScoreOfUsersByLigueId);
export default router;  