import configDB from '../connections/configDB';

export interface IEquipe{
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
            // Construisez la requête SQL pour sélectionner le joueur par ID
            let query = `SELECT * FROM equipe WHERE id = ?`;
            // Exécutez la requête avec l'ID fourni
            const [rows] = await configDB.execute(query, [equipe_id]);
            // Si des lignes sont renvoyées, créez un nouvel objet User avec les données de la première ligne
            return rows.length ? new Equipe(rows[0]) : null;
        } catch (error) {
            console.error('Error finding equipe by ID:', error);
            return null
        }
    }

    static async getEquipesByLigue(ligueId: string) {
        try {
            // Construisez la requête SQL pour sélectionner le joueur par ID
            let query = `SELECT * FROM equipe WHERE ligue = ?`;
            // Exécutez la requête avec l'ID fourni
            const [rows] = await configDB.execute(query, [ligueId]);
            // Si des lignes sont renvoyées, créez un nouvel objet User avec les données de la première ligne
            return rows.length ? new Equipe(rows[0]) : null;
        } catch (error) {
            console.error('Error finding equipe by ligueID:', error);
            return null
        }
    }

    static async getEquipesByUtilisateur(userId: string) {
        try {
            // Construisez la requête SQL pour sélectionner le joueur par ID
            let query = `SELECT * FROM equipe WHERE utilisateur = ?`;
            // Exécutez la requête avec l'ID fourni
            const [rows] = await configDB.execute(query, [userId]);
            // Si des lignes sont renvoyées, créez un nouvel objet User avec les données de la première ligne
            return rows.length ? new Equipe(rows[0]) : null;
        } catch (error) {
            console.error('Error finding equipe by ligueID:', error);
            return null
        }
    }

    static async create(ligue: string, utilisateur: string, nom:string): Promise<string> {
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

    static async addJoueurNBA(equipe_id: string,id_joueur: string): Promise<string> {
        try {
            const [rows, fields] = await configDB.execute(
                'INSERT INTO lien_equipe_joueur (joueur_NBA, equipe) VALUES (?,?);',
                [id_joueur, equipe_id]
            );
            return "success";
            
        } catch (error) {
            console.error('Error inserting playerNBA/equipe link in database', error);
            return "error";
        }
    }

    static async removeJoueurNBA(equipe_id: string,id_joueur: string): Promise<string> {
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

    static async replaceJoueurNBA(equipe_id: string,id_nouveau: string, id_ancien: string): Promise<string> {
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