import configDB from '../connections/configDB';
import User from './User';
export interface IDraft {
    id?: number;
    type_draft: string;
    contrainte1: string;
    contrainte2: string;
    contrainte3: string;
    contrainte4: string;
    contrainte5: string;
    contrainte6: string;
    contrainte7: string;
    contrainte8: string;
    contrainte9: string;
    contrainte10: string;
}

export interface DraftRow {
    id_relation: number;
    id_draft: number;
    id_ligue: number;
    date_debut: Date;
    date_fin: Date;
    scoreUpdated: number;
    // Ajoutez d'autres propriétés au besoin
}

class Draft {
    private draft: IDraft;
    constructor(draft: IDraft) {
        this.draft = draft;
    }
    getId(): number {
        if (this.draft.id === undefined) {
            // Gérer le cas où l'ID est indéfini
            throw new Error("ID is undefined");
        }
        return this.draft.id;
    }
    getTypeDraft(): string {
        return this.draft.type_draft;
    }

    getContrainte1(): string {
        return this.draft.contrainte1;
    }
    getContrainte2(): string {
        return this.draft.contrainte2;
    }
    getContrainte3(): string {
        return this.draft.contrainte3;
    }
    getContrainte4(): string {
        return this.draft.contrainte4;
    }
    getContrainte5(): string {
        return this.draft.contrainte5;
    }
    getContrainte6(): string {
        return this.draft.contrainte6;
    }
    getContrainte7(): string {
        return this.draft.contrainte7;
    }
    getContrainte8(): string {
        return this.draft.contrainte8;
    }
    getContrainte9(): string {
        return this.draft.contrainte9;
    }
    getContrainte10(): string {
        return this.draft.contrainte10;
    }

    static async findDraftById(id: number): Promise<Draft | null> {
        const [rows] = await configDB.execute('SELECT * FROM draft WHERE id =?', [id]);
        return rows;
    }

    static async findDraftsByLeagueId(id: string): Promise<Draft | null> {
        const [rows] = await configDB.execute('SELECT draft.* FROM draft JOIN lien_draft_ligue ON draft.id = lien_draft_ligue.id_draft WHERE lien_draft_ligue.id_ligue = ?;', [id]);
        const drafts = rows.map((row: any) => new Draft(row));
        return drafts;
    }

    static async findDraftByLigueIdAndDraftId(id: string, id_draft: string): Promise<Draft | null> {
        const [rows] = await configDB.execute('SELECT * FROM lien_draft_ligue WHERE id_ligue = ? AND id_draft = ?;', [id, id_draft]);
        const drafts = rows.map((row: any) => new Draft(row));
        console.log("draft idligue iddraft", drafts);
        return drafts;
    }
    static async findDraftByLigueIdAndDraftId2(id: string, id_draft: string): Promise<Draft | null> {
        const [rows] = await configDB.execute('SELECT * FROM lien_draft_ligue WHERE id_ligue = ? AND id_draft = ?;', [id, id_draft]);
        return rows;
    }

    static async findCurrentDraft(idLigue: string): Promise<DraftRow | null> {
        try {
            const [rows] = await configDB.execute('SELECT * FROM lien_draft_ligue WHERE id_ligue = ? ORDER BY id_draft DESC LIMIT 1;', [idLigue]);
            if (rows.length > 0) {
                const draftRow: DraftRow = {
                    id_relation: rows[0].id_relation,
                    id_draft: rows[0].id_draft,
                    id_ligue: rows[0].id_ligue,
                    date_debut: new Date(rows[0].date_debut),
                    date_fin: new Date(rows[0].date_fin),
                    scoreUpdated: rows[0].scoreUpdated,
                    // Ajoutez d'autres propriétés au besoin
                    // Ajoutez d'autres propriétés au besoin
                };

                console.log(draftRow);
                return draftRow;
            } else {
                console.log("No drafts found for the league.");
                return null;
            }
        } catch (error) {
            console.error('Error finding draft by league ID:', error);
            return null;
        }
    }

    static async setUpdatedScore(idDraft: string): Promise<number> {
        try {
            const [rows] = await configDB.execute('UPDATE lien_draft_ligue SET scoreUpdated = 1 WHERE id_relation =? ;', [idDraft]);
            return 1;
        } catch (error) {
            console.error('Error finding draft by league ID:', error);
            return 0;
        }
    }

    static async createDraft(idLigue: string, date_debut: string): Promise<string> {
        try {
            const [rowsCurrentDraft] = await configDB.execute('SELECT id_draft, date_debut, date_fin FROM lien_draft_ligue WHERE id_ligue = ? ORDER BY id_draft DESC LIMIT 1;', [idLigue]);
            console.log("current draft");
            console.log(rowsCurrentDraft);
            if (rowsCurrentDraft && rowsCurrentDraft.length > 0) {
                console.log(rowsCurrentDraft[0].date_fin);
                const dateFinDraft = new Date(rowsCurrentDraft[0].date_fin);
                const dateDebutDraft = new Date(rowsCurrentDraft[0].date_debut);
                const idLastDraft = rowsCurrentDraft[0].id_draft;
                console.log(dateFinDraft);
                if (dateFinDraft > new Date(date_debut) || dateDebutDraft > new Date(date_debut)) {
                    return "chevauchement de drafts";
                }
                else if (dateFinDraft < dateDebutDraft) {
                    return "Dates de drafts invalides";
                }
                else {
                    console.log(idLastDraft);
                    const [rows] = await configDB.execute('INSERT INTO lien_draft_ligue (id_ligue, id_draft, date_debut, date_fin) VALUES (?, ?, ?, DATE_ADD(?, INTERVAL 1 WEEK))', [idLigue, idLastDraft + 1, new Date(date_debut), new Date(date_debut)]);
                    const [rowsIdUsers] = await configDB.execute('SELECT id FROM utilisateurs INNER JOIN lien_utilisateur_ligue ON utilisateurs.id = lien_utilisateur_ligue.utilisateur WHERE lien_utilisateur_ligue.ligue = ?', [idLigue]);
                    if (rowsIdUsers && rowsIdUsers.length > 0) {
                        for (const idUser of rowsIdUsers) {
                            console.log('idUtilisateur');
                            console.log(idUser.id);
                            // Insérer dans la table 'equipe'
                            const rowCurrDraft: DraftRow | null = await Draft.findCurrentDraft(idLigue);
                            const [rows2] = await configDB.execute('INSERT INTO equipe (ligue, utilisateur, nom, draft, draft_relation) VALUES (?, ?, ?, ?, ?)', [idLigue, idUser.id, 'draft', idLastDraft + 1, rowCurrDraft?.id_relation]);
                        }
                        return "draft +1 et inscrit";
                    }
                    return "draft +1 et pas inscrit";
                }
            }
            else {
                const [rows] = await configDB.execute('INSERT INTO lien_draft_ligue (id_ligue, id_draft, date_debut, date_fin) VALUES (?, 1, ?, DATE_ADD(?, INTERVAL 1 WEEK))', [idLigue, new Date(date_debut), new Date(date_debut)]);
                const [rowsIdUsers] = await configDB.execute('SELECT id FROM utilisateurs INNER JOIN lien_utilisateur_ligue ON utilisateurs.id = lien_utilisateur_ligue.utilisateur WHERE lien_utilisateur_ligue.ligue = ?', [idLigue]);
                if (rowsIdUsers && rowsIdUsers.length > 0) {
                    for (const idUser of rowsIdUsers) {
                        console.log('idUtilisateur');
                        console.log(idUser.id);
                        // Insérer dans la table 'equipe'
                        const rowCurrDraft: DraftRow | null = await Draft.findCurrentDraft(idLigue);
                        const [rows2] = await configDB.execute('INSERT INTO equipe (ligue, utilisateur, nom, draft, draft_relation) VALUES (?, ?, ?, ?, ?)', [idLigue, idUser.id, 'draft', 1, rowCurrDraft?.id_relation]);
                    }
                    return "nouvelle draft et inscrit";
                }

                return "nouvelle draft pas inscrit";
            }
        }
        catch (error) {
            console.error('Error updating draft:', error);
            return "error";
        }
    }

    static async findDraftedPlayersByDraft(idDraft: string): Promise<string[] | null> {
        try {
            /*const [players] = await configDB.execute('SELECT * FROM lien_equipe_joueur', []);*/
            const [rows] = await configDB.execute('SELECT lien_equipe_joueur.joueur_NBA, joueur_NBA.nom, joueur_NBA.prenom, lien_equipe_joueur.equipe, equipe.utilisateur FROM joueur_NBA INNER JOIN lien_equipe_joueur ON joueur_NBA.id = lien_equipe_joueur.joueur_NBA INNER JOIN equipe ON equipe.id = lien_equipe_joueur.equipe WHERE equipe.draft_relation = ? ORDER BY lien_equipe_joueur.id_relation', [idDraft]);
           /*const players = rows.map((row: { joueur_NBA: any; }) => row.joueur_NBA);
            console.log(players);
            return players;*/

            return rows;
        }
        catch (error) {
            console.error('Error finding players drafted', error);
            return null
        }
    }

    static async findDraftedPlayers(): Promise<string[] | null> {
        try {
            /*const [players] = await configDB.execute('SELECT * FROM lien_equipe_joueur', []);*/
            const [rows] = await configDB.execute('SELECT * FROM joueur_NBA INNER JOIN lien_equipe_joueur ON joueur_NBA.id = lien_equipe_joueur.joueur_NBA', []);
            /*const players = rows.map((row: { joueur_NBA: any; }) => row.joueur_NBA);
             console.log(players);
             return players;*/
            return rows;
        }
        catch (error) {
            console.error('Error finding players drafted', error);
            return null
        }
    }

    // static async findDraftedPlayers(): Promise<string[] | null> {
    //     try {
    //         /*const [players] = await configDB.execute('SELECT * FROM lien_equipe_joueur', []);*/
    //         const [rows] = await configDB.execute('SELECT joueur_NBA FROM lien_equipe_joueur', []);
    //         const players = rows.map((row: { joueur_NBA: any; }) => row.joueur_NBA);
    //         console.log(players);
    //         return players;
    //     }
    //     catch (error) {
    //         console.error('Error finding players drafted', error);
    //         return null
    //     }
    // }

    /*static async findDraftedPlayers(): Promise<string[] | null> {
        try {
            const [playersInfoRows] = await configDB.execute(`SELECT joueur_NBA.*, lien_equipe_joueur.equipe FROM joueur_NBA INNER JOIN lien_equipe_joueur ON joueur_NBA.id = lien_equipe_joueur.joueur_NBA`, []);
            console.log(playersInfoRows);
            return playersInfoRows;
        }
        catch (error) {
            console.error('Error finding players drafted', error);
             return null
        }
    }*/

}
export default Draft;