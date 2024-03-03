import configDB from '../connections/configDB';

export interface ILigue {
    id?: number;
    nom: string;
}

class Ligue {
    private ligue: ILigue;
    constructor(ligue: ILigue) {
        this.ligue = ligue;
    }
    getId(): number {
        if (this.ligue.id === undefined) {
            // Gérer le cas où l'ID est indéfini
            throw new Error("ID is undefined");
        }
        return this.ligue.id;
    }
    getNom(): string {
        return this.ligue.nom;
    }

    static async findById(id: string): Promise<Ligue | null> {
        const [rows] = await configDB.execute('SELECT * FROM ligues WHERE id =?', [id]);
        console.log('test ligue');
        const ligue = rows[0];
        return ligue;
    }

    static async findLiguesByUserId(id: string): Promise<Ligue | null> {
        const [rows] = await configDB.execute('SELECT ligues.* FROM ligues JOIN lien_utilisateur_ligue ON ligues.id = lien_utilisateur_ligue.ligue WHERE lien_utilisateur_ligue.utilisateur = ?;', [id]);
        const ligues = rows.map((row: any) => new Ligue(row));
        return ligues;
    }

    static async inscriptionLigue(code_access: string, id_user: string): Promise<number | null> {
        // verifier si le code d'acces donne acces à une ligue
        const [ligueRows] = await configDB.execute('SELECT * FROM ligues WHERE code_acces = ?;', [code_access]);
        if (ligueRows.length === 0) {
            // Si la ligue n'existe pas, retournez null
            return null;
        }
        const ligueId = ligueRows[0].id;

        // Vérifiez si l'utilisateur est déjà inscrit dans cette ligue
        const [existingRows] = await configDB.execute('SELECT * FROM lien_utilisateur_ligue WHERE utilisateur = ? AND ligue = ?;', [id_user, ligueId]);
        if (existingRows.length > 0) {
            // Si l'utilisateur est déjà inscrit, retournez null
            return null;
        }

        // Créer le lien entre la ligue et l'utilisateur
        const [insertRows] = await configDB.execute('INSERT INTO lien_utilisateur_ligue (ligue, utilisateur) VALUES (?,?);', [ligueId, id_user]);
        if (insertRows.affectedRows === 1) {
            return insertRows.affectedRows;
        }
        return null;
    }

    static async findByCode(code_acces: string): Promise<Ligue | null> {
        const [rows] = await configDB.execute('SELECT * FROM ligues WHERE code_acces =?;', [code_acces]);
        return rows.length ? new Ligue(rows[0]) : null;
    }

    static async create(ligue: ILigue, idUser: string): Promise<Ligue | null> {
        try {
            // Étape 1 : Générer le code_acces aléatoirement
            const [randomCodeRows] = await configDB.execute('SELECT generateRandomCode();', []);

            // Vérifier si la génération du code_acces a réussi
            if (randomCodeRows.length > 0) {
                // Récupérer le code_acces généré
                const randomCode = Object.values(randomCodeRows[0])[0];
                // Étape 2 : Insérer le nom et le code_acces dans la table
                const [insertRows] = await configDB.execute('INSERT INTO ligues (nom, code_acces) VALUES (?, ?)', [ligue.nom, randomCode]);
                const lastInsertId = insertRows.insertId;

                // Vérifier si l'insertion a réussi
                if (insertRows.affectedRows === 1) {
                    // Retourner la nouvelle ligne (c'est-à-dire la ligue créée)    
                    const [insertRows] = await configDB.execute('INSERT INTO lien_utilisateur_ligue (ligue, utilisateur) VALUES (?,?);', [lastInsertId, idUser]);
                    console.log([insertRows]);
                    const [selectRows] = await configDB.execute('SELECT * FROM ligues WHERE id = LAST_INSERT_ID()', []);
                    return selectRows.length ? new Ligue(selectRows[0]) : null;
                }
            }
            console.log("Erreur lors de la génération du code_acces");
            // Si quelque chose a échoué, retourner null
            return null;
        } catch (error) {
            console.error('Erreur lors de la création de la ligue :', error);
            return null;
        }
    }

    static async updateNom(ligue: ILigue): Promise<Ligue | null> {
        const [rows] = await configDB.execute('UPDATE ligues SET nom =? WHERE id =?', [ligue.nom, ligue.id]);
        return rows.length ? new Ligue(rows[0]) : null;
    }

    static async delete(id: number): Promise<number> {
        const [rows] = await configDB.execute('DELETE FROM ligues WHERE id =?', [id]);
        return rows.affectedRows || 0;
    }

}
export default Ligue;