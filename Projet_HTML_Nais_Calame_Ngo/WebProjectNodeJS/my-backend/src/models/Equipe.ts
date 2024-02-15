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
    
    static async getEquipeById(id: string): Promise<Equipe | null> {
        return null;
    }

    static async create(equipe: IEquipe): Promise<string> {
        return "";
    }

    static async addJoueurNBA(id_joueur: string): Promise<string> {
        return "";
    }

    static async removeJoueurNBA(id_joueur: string): Promise<string> {
        return "";
    }

    static async replaceJoueurNBA(id_nouveau: string, id_ancien: string): Promise<string> {
        return "";
    }
    
    static async getHistorique(id: string): Promise<string | null> {
        return "";
    }


}

export default Equipe;