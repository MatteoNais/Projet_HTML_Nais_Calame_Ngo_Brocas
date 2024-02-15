import express from "express";
import { getTeambyID, importAllTeamsToBDD } from "../controllers/teamController"

const router = express.Router();

router.get("/updateBDD", importAllTeamsToBDD)
router.get(":team_id", getTeambyID);




export default router;