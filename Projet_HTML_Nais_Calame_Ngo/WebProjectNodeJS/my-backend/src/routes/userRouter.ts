import express from "express";
import { getUser, getUsersByIdLigues } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getUser);
router.get("/ligue/:id_ligue", getUsersByIdLigues);
export default router;  