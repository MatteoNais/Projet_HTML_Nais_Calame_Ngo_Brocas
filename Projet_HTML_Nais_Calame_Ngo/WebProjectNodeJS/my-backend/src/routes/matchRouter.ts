import express from "express";
import {getAllMatchbyDate} from "../controllers/matchController";

const router = express.Router();

router.get("/all_match/:date_of_matches", getAllMatchbyDate); // http://localhost:8000/match/all_match pour exécuter la fonction getAllMatch

export default router;