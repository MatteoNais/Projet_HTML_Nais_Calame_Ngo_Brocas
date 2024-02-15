import configDB from '../connections/configDB';

export interface IPlayer {
    id: number;
    equipeNBA_id: number;
    nom: string;
    prenom: string;
}

class Player {
    private player: IPlayer;

    constructor(p: IPlayer) {
        this.player = p;
    }

    static async save(player: IPlayer): Promise<number> {
        try {
            console.log(player)
            const [rows, fields] = await configDB.execute(
                'INSERT INTO joueur_NBA (id, equipeNBA_id, nom, prenom) VALUES (?,?,?,?);',
                [player.id, player.equipeNBA_id, player.nom, player.prenom]
            );
            return 1;

        } catch (error) {
            console.error('Error inserting player in database', error);
            return 0;
        }
    }

    static async findById(playerId: string): Promise<Player | null> {
        try {
            // Construisez la requête SQL pour sélectionner le joueur par ID
            let query = `SELECT * FROM joueur_NBA WHERE id = ?`;
            // Exécutez la requête avec l'ID fourni
            const [rows] = await configDB.execute(query, [playerId]);
            // Si des lignes sont renvoyées, créez un nouvel objet User avec les données de la première ligne
            return rows.length ? new Player(rows[0]) : null;
        } catch (error) {
            console.error('Error finding player by ID:', error);
            return null
        }
    }

    static async getAllPlayers(): Promise<Player | null> {
        try {
            let query = `SELECT * FROM joueur_NBA`;
            const [rows] = await configDB.execute(query, []);
            return rows.length ? new Player(rows) : null;

        } catch (error) {
            console.error('Error finding all players:', error);
            return null
        }
    }

    static async findByIdTeam(teamID: string): Promise<Player | null> {
        try {
            let query = `SELECT * FROM joueur_NBA WHERE equipeNBA_id = ?`;
            const [rows] = await configDB.execute(query, [teamID]);
            return rows.length ? new Player(rows) : null;

        } catch (error) {
            console.error('Error finding all players:', error);
            return null
        }
    }

    static async getLast5Match(playerId: string): Promise<string | null> {
        try {
            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./src/api_NBA_python/GetLastNGames.py", playerId, 5]);

            let data = "";
            for await (const chunk of process.stdout) {
                data += chunk;
            }
            let error = "";
            for await (const chunk of process.stderr) {
                error += chunk;
            }


            const exitCode = await new Promise((resolve, reject) => {
                process.on('close', resolve);
            });

            if (exitCode) {
                throw new Error(`subprocess error exit ${exitCode}, ${error}`);
            }

            return JSON.parse(data);

        } catch (error) {
            console.error('Error finding user stats by ID:', error);
            return null;
        }
    }

    static async getAllPlayersAPI(): Promise<string> {
        try {
            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./src/api_NBA_python/GetAllPlayers.py"]);

            let data = "";
            for await (const chunk of process.stdout) {
                data += chunk;
            }
            let error = "";
            for await (const chunk of process.stderr) {
                error += chunk;
            }

            const exitCode = await new Promise((resolve, reject) => {
                process.on('close', resolve);
            });
            if (exitCode) {
                throw new Error(`subprocess error exit ${exitCode}, ${error}`);
            }

            return data;
        } catch (error) {
            console.error('Error requesting all players:', error);
            return JSON.parse("request failed");
        }
    }

}

export default Player;