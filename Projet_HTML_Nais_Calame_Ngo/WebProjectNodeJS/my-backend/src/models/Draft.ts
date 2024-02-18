import configDB from '../connections/configDB';

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
        return rows.length ? new Draft(rows[0]) : null;
    }

    static async findDraftsByLeagueId(id: string): Promise<Draft | null> {
        const [rows] = await configDB.execute('SELECT draft.* FROM draft JOIN lien_draft_ligue ON draft.id = lien_draft_ligue.id_draft WHERE lien_draft_ligue.id_ligue = ?;', [id]);
        const drafts = rows.map((row: any) => new Draft(row));
        return drafts;
    }
}
export default Draft;