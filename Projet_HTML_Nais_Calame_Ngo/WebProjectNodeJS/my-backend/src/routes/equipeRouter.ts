import express from "express";
import  {getEquipeById, addJoueurNBA, removeJoueurNBA, replaceJoueurNBA, getHistorique, createEquipe} from "../controllers/equipeController";

const router = express.Router();

router.post("/", createEquipe)
router.get("/:id", getEquipeById);
router.get("historique/:id", getHistorique)
router.post("/addJoueurNBA/:id", addJoueurNBA);
router.post("/removeJoueurNBA/:id", removeJoueurNBA)
router.post("/replaceJoueurNBA/:new_id/;old_id", replaceJoueurNBA)

export default router;