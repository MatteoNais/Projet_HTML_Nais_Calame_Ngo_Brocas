import express from "express";
import { getLigueById, createLigue, getLiguesByUserId, inscriptionLigue } from "../controllers/ligueController";

const router = express.Router();

router.get("/id/:id", getLigueById);
router.post("/create", createLigue);
router.get("/id_user/:id_user", getLiguesByUserId);
router.post("/inscription_ligue", inscriptionLigue);
//router.post("/getAvailableNBAplayers", #TODO);
export default router;