import express from "express";
import { getPlayerbyID, getRecentStats, importAllPlayersToBDD } from "../controllers/playerController"

const router = express.Router();

router.get("/updateBDD/", importAllPlayersToBDD)
router.get(":player_id", getPlayerbyID);
router.get("/recentstats/:player_id", getRecentStats);


export default router;