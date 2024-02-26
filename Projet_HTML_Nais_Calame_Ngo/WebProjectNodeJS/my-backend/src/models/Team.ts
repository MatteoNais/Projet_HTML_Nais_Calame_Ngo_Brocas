import configDB from '../connections/configDB';

export interface ITeam {
    id: number;
    nom: string;
    abbreviation: string;
    ville: string;
    }

class Team {
    private team: ITeam;

    constructor(t: ITeam) {
        this.team = t;
    }

    static async save(team: ITeam): Promise<number> {
        try {
            const [rows, fields] = await configDB.execute(
                'INSERT INTO equipe_NBA (id, nom, abbreviation, ville) VALUES (?,?,?,?);',
                [team.id, team.nom, team.abbreviation, team.ville]
            );       
            return 1;
        } catch (error) {
            console.error('Error inserting Team in database', error);
            return 0;
        }
    }

    static async findById(TeamId: string): Promise<Team | null> {
        try {
            let query = `SELECT * FROM equipe_NBA WHERE id = ?`;
            const [rows] = await configDB.execute(query, [TeamId]);
            return rows.length ? new Team(rows[0]) : null;
        } catch (error) {
            console.error('Error finding Team by ID:', error);
            return null
        }
    }

    static async getAllTeamsNBA(): Promise<string> {
        try {
            var spawn = require("child_process").spawn;
            var process = spawn('python',["./src/api_NBA_python/GetAllTeams.py"] ); 
            
            let data = "";
            for await (const chunk of process.stdout) {
                data += chunk;
            }
            let error = "";
            for await (const chunk of process.stderr) {
                error += chunk;
            }
            
            const exitCode = await new Promise( (resolve, reject) => {
                process.on('close', resolve);
            });
            if( exitCode) {
                throw new Error( `subprocess error exit ${exitCode}, ${error}`);
            }
            return data;
        } catch (error) {
            console.error('Error requesting all Teams:', error);
            return JSON.parse("request failed");
        }
    }

    static async getTeamInfo(teamId: string): Promise<string> {
        try {
            var spawn = require("child_process").spawn;
            var process = spawn('python',["./src/api_NBA_python/GetTeamInfo.py", teamId] ); 
            
            let data = "";
            for await (const chunk of process.stdout) {
                data += chunk;
            }
            let error = "";
            for await (const chunk of process.stderr) {
                error += chunk;
            }
            
            const exitCode = await new Promise( (resolve, reject) => {
                process.on('close', resolve);
            });
            if( exitCode) {
                throw new Error( `subprocess error exit ${exitCode}, ${error}`);
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error requesting all Teams:', error);
            return JSON.parse("request failed");
        }
    }

    static async getAllTeams(): Promise<Team | null> {
        try {
            let query = `SELECT * FROM equipe_NBA ORDER BY nom`;
            const [rows] = await configDB.execute(query,[]);
            return rows.length ? new Team(rows) : null;
        } catch (error) {
            console.error('Error finding Teams', error);
            return null
        }
    }

}

export default Team;