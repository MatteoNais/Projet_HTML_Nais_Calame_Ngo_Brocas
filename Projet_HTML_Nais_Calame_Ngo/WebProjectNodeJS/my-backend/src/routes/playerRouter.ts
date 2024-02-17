import express from "express";
import { getPlayerbyID, getRecentStats, importAllPlayersToBDD, getPlayers, getPlayerbyIDTeam, getPlayerFantaisyProfileById } from "../controllers/playerController"

const router = express.Router();

router.get("/updateBDD/", importAllPlayersToBDD)
router.get("/:player_id", getPlayerbyID);
router.get("/recentstats/:player_id", getRecentStats);
router.get("/", getPlayers);
router.get("/team/:equipeNBA_id", getPlayerbyIDTeam);
router.get("/fantaisy/:player_id", getPlayerFantaisyProfileById);
export default router;