import express from "express";
import  {getEquipeById, addJoueurNBA, getEquipesByLigue, removeJoueurNBA, replaceJoueurNBA, getHistorique, getEquipesByUtilisateur, createEquipe} from "../controllers/equipeController";

const router = express.Router();

router.post("/", createEquipe)
router.get("/byId/:equipe_id", getEquipeById);
router.get("/byLigue/:ligue_id", getEquipesByLigue);
router.get("/byUtilisateur/:utilisateur_id", getEquipesByUtilisateur);
router.get("/historique/:equipe_id", getHistorique)
router.post("/addJoueurNBA/:equipe_id/:id", addJoueurNBA);
router.post("/removeJoueurNBA/:equipe_id/:id", removeJoueurNBA)
router.post("/replaceJoueurNBA/:equipe_id/:new_id/:old_id", replaceJoueurNBA)

export default router;