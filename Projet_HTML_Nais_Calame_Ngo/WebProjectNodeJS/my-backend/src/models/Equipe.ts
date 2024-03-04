import configDB from '../connections/configDB';
import Draft from './Draft';
import Player from './Player';
import User from './User';
import dayjs from 'dayjs';

export interface IEquipe {
    id?: number;
    ligue: number;
    utilisateur: number;
    nom: string;
    score?: number;
}

export interface EquipeRow {
    id: number;
    ligue: number;
    utilisateur: number;
    nom: string;
    score: number;
    draft: number;
    // Ajoutez d'autres propriétés au besoin
}

class Equipe {
    private equipe: IEquipe;

    constructor(equipe: IEquipe) {
        this.equipe = equipe;
    }

    static async getEquipeById(equipe_id: string): Promise<Equipe | null> {
        try {
            let query = `SELECT * FROM equipe WHERE id = ?`;
            const [rows] = await configDB.execute(query, [equipe_id]);
            return rows.length ? new Equipe(rows[0]) : null;
        } catch (error) {
            console.error('Error finding equipe by ID:', error);
            return null
        }
    }

    static async getEquipesByLigue(ligueId: string) {
        try {
            let query = `SELECT * FROM equipe WHERE ligue = ?`;
            const [rows] = await configDB.execute(query, [ligueId]);
            //return rows.length ? new Equipe(rows[0]) : null;
            return rows;
        } catch (error) {
            console.error('Error finding equipe by ligueID:', error);
            return null
        }
    }

    static async getEquipesByLigueAndByDraft(ligueId: string, draftId: string) {
        try {
            let query = `SELECT * FROM equipe WHERE ligue = ? AND draft = ?`;
            const [rows] = await configDB.execute(query, [ligueId, draftId]);
            //return rows.length ? new Equipe(rows[0]) : null;
            return rows;
        } catch (error) {
            console.error('Error finding equipe by ligueID:', error);
            return null
        }
    }

    static async getEquipesByUtilisateur(userId: string) {
        try {
            let query = `SELECT * FROM equipe WHERE utilisateur = ?`;
            const [rows] = await configDB.execute(query, [userId]);
            return rows.length ? new Equipe(rows[0]) : null;
        } catch (error) {
            console.error('Error finding equipe by ligueID:', error);
            return null
        }
    }

    static async getEquipeByLigueAndUser(ligueId: string, userId: string): Promise<Equipe | null> {
        const currentDraft = await Draft.findCurrentDraft(ligueId); // On récupère l'id de la draft en cours
        console.log("Draft : " + currentDraft?.id_draft.toString());

        try {
            let query = `SELECT * FROM equipe WHERE ligue = ? AND utilisateur = ? AND draft = ?`;
            const [rows] = await configDB.execute(query, [ligueId, userId, currentDraft?.id_draft]);

            //let query = `SELECT * FROM equipe WHERE ligue = ? AND utilisateur = ?`;
            //const [rows] = await configDB.execute(query, [ligueId, userId]);
            return rows;
        } catch (error) {
            console.error('Error finding equipe by ligueID and userId:', error);
            return null
        }
    }

    static async getEquipeByLigueAndUserAndDraft(ligueId: string, userId: string, draftId: string): Promise<EquipeRow | null> {
        try {
            let query = `SELECT * FROM equipe WHERE ligue = ? AND utilisateur = ? AND draft = ?`;
            const [rows] = await configDB.execute(query, [ligueId, userId, draftId]);

            if (rows.length > 0) {
                const equipeRow: EquipeRow = {
                    id: rows[0].id,
                    ligue: rows[0].ligue,
                    utilisateur: rows[0].utilisateur,
                    nom: rows[0].nom,
                    score: rows[0].score,
                    draft: rows[0].draft,

                };

                console.log(equipeRow);
                return equipeRow;
            } else {
                console.log("Pas d'équipe de défiit pour l'user : " + userId);
                return null;
            }
        } catch (error) {
            console.error('Error finding equipe by ligueID and userId:', error);
            return null
        }
    }

    static async create(ligue: string, utilisateur: string, nom: string): Promise<string> {
        try {
            const [rows, fields] = await configDB.execute(
                'INSERT INTO (ligue, utilisateur, nom) VALUES (?,?,?);',
                [ligue, utilisateur, nom]
            );
            return "success";

        } catch (error) {
            console.error('Error inserting player in database', error);
            return "error";
        }
    }

    static async getScoreEquipe(idUser: string, idLigue: string): Promise<number[] | null> {
        try {
            let query = `SELECT score FROM equipe INNER JOIN lien_draft_ligue ON equipe.draft_relation = lien_draft_ligue.id_relation WHERE equipe.utilisateur = ? AND equipe.ligue = ? AND lien_draft_ligue.date_fin < ?`;
            const [rows] = await configDB.execute(query, [idUser, idLigue, dayjs().format("YYYY-MM-DD HH:mm:ss")]);
            console.log(rows);
            return rows;
        }
        catch (error) {
            console.error('Error finding score by userID:', error);
            return null;
        }
    }
    static async updateScoreEquipe(idLigue: string): Promise<string> {
        try {
            const currentDraft = await Draft.findCurrentDraft(idLigue); // On récupère l'id de la draft en cours
            console.log(currentDraft);
            if (currentDraft && currentDraft.date_fin < new Date() && currentDraft.scoreUpdated == 0) { // Si la date de fin de la draft est passée on rentre dans le if
                const users: User[] | null = await User.findUsersByLigueId(idLigue); // On récupère la liste des users présent dans la ligue
                console.log(users)
                if (users != null) {
                    console.log("rentre if users");
                    for (const user of users) { // parcourt les users
                        const equipe = await Equipe.getEquipeByLigueAndUserAndDraft(idLigue, user?.getId().toString(), currentDraft.id_draft.toString()); // récupère l'équipe de la dernière draft
                        console.log(equipe);
                        if (equipe?.id != null) {
                            console.log("rentre if equipes");
                            const players = await Player.getPlayersByIdEquipe(equipe.id.toString()); // On récupère la liste des players nba de l'équipe
                            let totalscore = 0; // initialisation du score total à 0
                            if (players != null) {
                                for (const player of players) { // pour tous les joueurs on calcule leur score total
                                    const scoreData = await Player.getScorePlayer(player.getId().toString(), dayjs(currentDraft?.date_debut).format('YYYY-MM-DD'), dayjs(currentDraft?.date_fin).format('YYYY-MM-DD'));
                                    console.log(scoreData);
                                    try {
                                        // Essayez de parser la chaîne JSON
                                        const parsedScore = (scoreData as any)?.score || 0; // On parse le json pour récupérer le score
                                        console.log(parsedScore);
                                        totalscore += parsedScore;
                                    } catch (error) {
                                        console.error('Error parsing score:', error);
                                    }

                                }
                                console.log(Math.ceil(totalscore));
                            }
                            console.log(players);
                            // Update du score des équipes.
                            let query = `UPDATE equipe SET score = ? WHERE id = ?`;
                            const [rows] = await configDB.execute(query, [Math.ceil(totalscore), equipe.id]);
                            console.log(rows);
                        } else {
                            console.log("No equipe found for the user.");
                        }
                    }
                    const updatedDraft = await Draft.setUpdatedScore(currentDraft.id_relation.toString());
                    if (updatedDraft == 1) {
                        return "success";
                    }
                    else {
                        return "error_notify score updated";
                    }
                } else {
                    console.log("No users found for the league.");
                    return "no_users";
                }
            }
            else {
                return "la date de fin n'est pas encore passée ou le score a déjà été update";
            }
        }
        catch (error) {
            console.error('Error updating score in database', error);
            return "error";
        }
    }


    static async addJoueurNBA(equipe_id: string, id_joueur: string): Promise<string> {
        try {
            // Check si joueur deja relé a cette equipe
            let query = `SELECT * FROM lien_equipe_joueur WHERE equipe = ? and joueur_NBA = ?`
            var [rows] = await configDB.execute(query, [equipe_id, id_joueur]);
            if (rows.length > 0) {
                return "error: there is this player in this equipe"
            }


            // Check si moins de 10 joueurs
            query = `SELECT * FROM lien_equipe_joueur WHERE equipe = ?`;
            var [rows] = await configDB.execute(query, [equipe_id]);
            console.log(rows.length)
            if (rows.length > 9) {
                return "error: there is already 10 NBA players for this equipe"
            }

            query = 'INSERT INTO lien_equipe_joueur (joueur_NBA, equipe) VALUES (?,?);'
            var [rows, fields] = await configDB.execute(query, [id_joueur, equipe_id]
            );
            return "success";

        } catch (error) {
            console.error('Error inserting playerNBA/equipe link in database', error);
            return "error";
        }
    }

    static async removeJoueurNBA(equipe_id: string, id_joueur: string): Promise<string> {
        try {
            const [rows, fields] = await configDB.execute(
                'DELETE FROM lien_equipe_joueur where equipe=? AND joueur_NBA=?;',
                [equipe_id, id_joueur]
            );
            return "success";

        } catch (error) {
            console.error('Error inserting playerNBA/equipe link in database', error);
            return "error";
        }
    }


    static async replaceJoueurNBA(equipe_id: string, id_nouveau: string, id_ancien: string): Promise<string> {
        try {
            const [rows, fields] = await configDB.execute(
                'UPDATE lien_equipe_joueur SET joueur_NBA=? where equipe=? AND joueur_NBA=?;',
                [id_nouveau, equipe_id, id_ancien]
            );
            return "success";

        } catch (error) {
            console.error('Error inserting playerNBA/equipe link in database', error);
            return "error";
        }
    }

    static async getHistorique(equipe_id: string): Promise<string | null> {
        return "";
    }


}

export default Equipe;