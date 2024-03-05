import configDB from '../connections/configDB';

export interface IMatch {
    game_id: number;
    score_domicile:number;
    score_exte:number;
    team_domicile : string;
    team_exte : string;
    date:string;
}

class Match{
    private match: IMatch;

    constructor(m: IMatch) {
        this.match = m;
    }

    //Exporter le fichier Json dans le navigateur avec le lien : http://localhost:8000/match/all_match
    static async getAllMatchbyDate(date:string): Promise<string> { 
        try {
            var spawn = require("child_process").spawn; // importer la fonction 'spawn' du module 'child_process' de Node.js
            var process = spawn('python',["./src/api_NBA_python/GetMatch.py",date]); // Créer un child process pour l'exécution du fichier 'GetMatch.py' dans le dossier
    // ---------------->>>>>>>>>>>>>> spawn('python',["./src/api_NBA_python/GetMatch.py"], parameters); pour donner au param dans sys.argv[i] une valeur. 
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
}

export default Match;