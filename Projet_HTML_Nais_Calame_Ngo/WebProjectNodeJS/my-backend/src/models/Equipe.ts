import configDB from '../connections/configDB';

export interface IEquipe {
    id?: number;
    ligue: number;
    utilisateur: number;
    nom: string;
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
            return rows.length ? new Equipe(rows[0]) : null;
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

    static async getEquipeByLigueAndUser(ligueId : string, userId: string) : Promise<Equipe | null> {
        try {
            let query = `SELECT * FROM equipe WHERE ligue = ? AND utilisateur = ?`;
            const [rows] = await configDB.execute(query, [ligueId, userId]);
            return rows.length ? new Equipe(rows[0]) : null;
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