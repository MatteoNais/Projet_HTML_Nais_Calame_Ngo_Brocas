import express from "express";
import { getEquipeById, addJoueurNBA, getEquipesByLigue, getEquipeByLigueAndUser, removeJoueurNBA, replaceJoueurNBA, updateScoreEquipe, getHistorique, getEquipesByUtilisateur, createEquipe, getEquipeByLigueAndUserAndDraft } from "../controllers/equipeController";

const router = express.Router();

router.post("/", createEquipe)
router.get("/byId/:equipe_id", getEquipeById);
router.get("/byLigue/:ligue_id", getEquipesByLigue);
router.get("/byUtilisateur/:utilisateur_id", getEquipesByUtilisateur);
router.get("/historique/:equipe_id", getHistorique)
router.post("/addJoueurNBA/:equipe_id/:id", addJoueurNBA);
router.post("/removeJoueurNBA/:equipe_id/:id", removeJoueurNBA)
router.post("/replaceJoueurNBA/:equipe_id/:new_id/:old_id", replaceJoueurNBA)
router.get("/byLigueAndUser/:ligue_id/:user_id", getEquipeByLigueAndUser);
router.get("/byLigueAndUserAndDraft/:ligue_id/:user_id/:draft_id", getEquipeByLigueAndUserAndDraft)
router.put("/updateScore/:ligue_id", updateScoreEquipe)
export default router;
