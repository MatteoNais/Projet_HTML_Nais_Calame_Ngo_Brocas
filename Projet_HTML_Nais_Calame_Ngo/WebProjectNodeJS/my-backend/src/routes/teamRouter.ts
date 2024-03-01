import express from "express";
import { getAllTeams, getTeambyID, getTeamInfoSimple, importAllTeamsToBDD, getTeamInfo } from "../controllers/teamController"

const router = express.Router();

router.get("/updateBDD", importAllTeamsToBDD)
router.get(":team_id", getTeambyID);
router.get("/info/:team_id", getTeamInfo);
router.get("/all", getAllTeams);
router.get("/infoExtra/:team_id", getTeamInfoSimple);


export default router;