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
            // Construisez la requête SQL pour sélectionner le joueur par ID
            let query = `SELECT * FROM equipe_NBA WHERE id = ?`;
            // Exécutez la requête avec l'ID fourni
            const [rows] = await configDB.execute(query, [TeamId]);
            // Si des lignes sont renvoyées, créez un nouvel objet User avec les données de la première ligne
            return rows.length ? new Team(rows[0]) : null;
        } catch (error) {
            console.error('Error finding Team by ID:', error);
            return null
        }
    }

    static async getAllTeams(): Promise<string> {
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

}

export default Team;