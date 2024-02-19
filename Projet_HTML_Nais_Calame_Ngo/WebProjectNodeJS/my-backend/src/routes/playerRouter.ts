import express from "express";
import { getPlayerbyID, getRecentStats, getPlayerInfo,importAllPlayersToBDD, getPlayers, getPlayerbyIDTeam, getPlayerFantaisyProfileById, getPlayersbyIdUserAndIdLigue } from "../controllers/playerController"

const router = express.Router();

router.get("/updateBDD/", importAllPlayersToBDD)
router.get("/:player_id", getPlayerbyID);
router.get("/info/:player_id", getPlayerInfo);
router.get("/recentstats/:player_id", getRecentStats);
router.get("/", getPlayers);
router.get("/team/:equipeNBA_id", getPlayerbyIDTeam);
router.get("/fantaisy/:player_id", getPlayerFantaisyProfileById);
router.get("/team/:ligue_id/:player_id", getPlayersbyIdUserAndIdLigue);
export default router;