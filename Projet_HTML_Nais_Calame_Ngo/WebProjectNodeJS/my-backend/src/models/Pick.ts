import configDB from '../connections/configDB';
//NOT USED
export interface IPick {
    player_id: number;
    team_id: number;
    pick_position?: number;
}

class Pick {
    private pick: IPick;
    constructor(pick: IPick) {
        this.pick = pick;
    }

    static async findAllPicks(): Promise<string[] | null> {
        try {
            const [playersInfoRows] = await configDB.execute(`SELECT * FROM lien_equipe_joueur`, []);
            console.log(playersInfoRows);
            return playersInfoRows;
        }
        catch (error) {
            console.error('Error finding players drafted', error);
             return null
        }
    }
}

export default Pick;