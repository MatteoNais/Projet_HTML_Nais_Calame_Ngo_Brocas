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

    getId(): number {
        if (this.player.id === undefined) {
            // Gérer le cas où l'ID est indéfini
            throw new Error("ID is undefined");
        }
        return this.player.id;
    }

    static async save(player: IPlayer): Promise<number> {
        try {
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
            let query = `SELECT * FROM joueur_NBA WHERE id = ?`;
            const [rows] = await configDB.execute(query, [playerId]);
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

    static async getPlayersInEquipeByUtilisateur(playerId: string, ligueId: string, draftId: string): Promise<Player | null> {
        try {
            let query = `SELECT joueur_NBA.id, joueur_NBA.nom, joueur_NBA.prenom
            FROM
                joueur_NBA
                JOIN lien_equipe_joueur ON joueur_NBA.id = lien_equipe_joueur.joueur_NBA
                JOIN equipe ON lien_equipe_joueur.equipe = equipe.id
            WHERE
                equipe.utilisateur = ? 
                AND equipe.ligue = ?
                AND equipe.draft = ?`;
            const [rows] = await configDB.execute(query, [playerId, ligueId, draftId]);
            return rows.length ? new Player(rows) : null;
        } catch (error) {
            console.error('Error finding all players:', error);
            return null
        }
    }

    static async getPlayersByIdEquipe(equipeId: string): Promise<Player[] | null> {
        try {
            let query = `SELECT joueur_NBA.id, joueur_NBA.nom, joueur_NBA.prenom
            FROM
                joueur_NBA
                JOIN lien_equipe_joueur ON joueur_NBA.id = lien_equipe_joueur.joueur_NBA
                JOIN equipe ON lien_equipe_joueur.equipe = equipe.id
            WHERE
                equipe.id = ?`;
            const [rows] = await configDB.execute(query, [equipeId]);
            return rows.map((playerData: any) => new Player(playerData));

        } catch (error) {
            console.error('Error finding all players:', error);
            return null
        }
    }

    static async getScorePlayer(playerId: string, date_debut: string, date_fin: string): Promise<string | null> {
        try {
            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./src/api_NBA_python/GetScoreJoueur.py", playerId, date_debut, date_fin]);

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

            let lastConsoleLogData = JSON.parse(data);
            data = {
                ...lastConsoleLogData
            };
            //console.log(data);
            return data;

        } catch (error) {
            console.error('Error finding user stats by ID:', error);
            return null;
        }
    }
    static async getLast5Match(playerId: string, date_debut: string, date_fin: string): Promise<string | null> {
        try {
            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./src/api_NBA_python/GetLastNGames.py", playerId, date_debut, date_fin]);

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

            // let query = `SELECT nom, prenom FROM joueur_NBA WHERE id = ?`;
            // const [rows] = await configDB.execute(query, [playerId]);

            let lastConsoleLogData = JSON.parse(data);
            data = {
                ...lastConsoleLogData
            };
            console.log(data);

            return data;

        } catch (error) {
            console.error('Error finding user stats by ID:', error);
            return null;
        }
    }

    static async getPlayerFantaisyProfile(playerId: string): Promise<string | null> {
        try {
            console.log(playerId);
            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./src/api_NBA_python/GetPlayerFantaisyProfile.py", playerId]);

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
        }
        catch (error) {
            console.error('Error finding user stats by ID:', error);
            return null;
        }
    }

    static async getPlayerInfo(playerId: string): Promise<string | null> {
        try {

            var spawn = require("child_process").spawn;
            var process = spawn('python', ["./src/api_NBA_python/GetPlayerInfo.py", playerId]);

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
        }
        catch (error) {
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

            return JSON.parse(data);
        } catch (error) {
            console.error('Error requesting all players:', error);
            return JSON.parse("request failed");
        }
    }

}

export default Player;