import express from "express";
import { getPlayerbyID, getPlayersByIdEquipe, getPlayerINFObyIDTeam, getRecentStats, getPlayerInfo, importAllPlayersToBDD, getPlayers, getPlayerbyIDTeam, getPlayerFantaisyProfileById, getPlayersbyIdUserAndIdLigue, getScorePlayer } from "../controllers/playerController"

const router = express.Router();

router.get("/updateBDD/", importAllPlayersToBDD)
router.get("/:player_id", getPlayerbyID);
router.get("/info/:player_id", getPlayerInfo);
router.get("/infoByTeam/:equipeNBA_id", getPlayerINFObyIDTeam);
router.get("/recentstats/:player_id/:date_debut/:date_fin", getRecentStats);
router.get("/score/:player_id/:date_debut/:date_fin", getScorePlayer);
router.get("/", getPlayers);
router.get("/team/:equipeNBA_id", getPlayerbyIDTeam);
router.get("/fantaisy/:player_id", getPlayerFantaisyProfileById);
router.get("/team/:ligue_id/:player_id/:draft_id", getPlayersbyIdUserAndIdLigue);
router.get("/equipe/:equipe_id", getPlayersByIdEquipe);
export default router;