import express from "express";
import { getAllTeams, getTeambyID, importAllTeamsToBDD, getTeamInfo, getAllTeamsInfo, getTeamInfoSimple } from "../controllers/teamController"

const router = express.Router();

router.get("/updateBDD", importAllTeamsToBDD)
router.get(":team_id", getTeambyID);
router.get("/info/:team_id", getTeamInfo);
router.get("/infoExtra/:team_id", getTeamInfoSimple);
router.get("/all", getAllTeams);
router.get("/infoAllTeams", getAllTeamsInfo);



export default router;