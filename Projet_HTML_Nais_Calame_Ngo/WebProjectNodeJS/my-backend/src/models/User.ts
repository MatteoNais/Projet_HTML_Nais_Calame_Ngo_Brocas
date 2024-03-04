import configDB from '../connections/configDB';
import bcrypt from "bcryptjs";
import Equipe from './Equipe';
export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
    comparePassword?: (enteredPassword: string) => boolean;
}

interface UserWithScore {
    username: string;
    id: number;
    score: number;
    meanScore: number;
}
class User {
    private user: IUser;

    constructor(user: IUser) {
        this.user = user;
    }

    private hashPassword(password: string): string {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }


    async save(): Promise<number> {
        this.user.password = this.hashPassword(this.user.password);
        const [rows, fields] = await configDB.execute(
            'INSERT INTO utilisateurs (username, email, password) VALUES (?, ?, ?)',
            [this.user.username, this.user.email, this.user.password]
        );
        if (rows.insertId) {
            // Si insertId est défini, cela signifie qu'un ID a été généré par la base de données
            this.user.id = rows.insertId;
        }

        return rows.affectedRows || 0;

    }

    static async findOneByEmail(email: string): Promise<User | null> {
        const [rows] = await configDB.execute('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        return rows.length ? new User(rows[0]) : null;
    }

    static async findUsersByLigueId(idLigue: string): Promise<User[] | null> {
        try {
            let query = `SELECT id, username FROM utilisateurs 
            INNER JOIN lien_utilisateur_ligue ON utilisateurs.id = lien_utilisateur_ligue.utilisateur 
            WHERE lien_utilisateur_ligue.ligue = ?`;
            const [rows] = await configDB.execute(query, [idLigue]);
            return rows.map((userData: any) => new User(userData));
        } catch (error) {
            console.error('Error finding user by ID:', error);
            return null;
        }
    }

    static async findScoreOfUsersByLigueId(idLigue: string): Promise<UserWithScore[] | null> {
        try {

            const users = await this.findUsersByLigueId(idLigue);
            if (!users) {
                return null;
            }
            const usersWithScore: UserWithScore[] = [];
            for (const user of users) {
                let meanScore = 0;
                let totalScore = 0;
                const scores = await Equipe.getScoreEquipe(user.getId().toString(), idLigue);
                console.log("score equipe", scores);
                if (scores) {
                    for (const score of scores) {
                        try {
                            // Essayez de parser la chaîne JSON
                            const parsedScore = (score as any)?.score || 0; // On parse le json pour récupérer le score
                            console.log(parsedScore);
                            totalScore += parsedScore;
                            console.log("parsedScore : " + parsedScore);
                        } catch (error) {
                            console.error('Error parsing score:', error);
                        }
                    }
                    meanScore = totalScore / scores.length;

                    const userScore: UserWithScore = {
                        username: user.getUsername(),
                        id: user.getId(),
                        score: totalScore,
                        meanScore: Number((totalScore / scores.length).toFixed(2))
                    };
                    usersWithScore.push(userScore);
                }
                else {
                    const userScore: UserWithScore = {
                        username: user.getUsername(),
                        id: user.getId(),
                        score: 0,
                        meanScore: 0
                    };
                    usersWithScore.push(userScore);
                }
            }
            console.log(usersWithScore);
            return usersWithScore;
        }
        catch (error) {
            console.error('Error finding user by ID:', error);
            return null;
        }
    }

    static async findById(userId: string, fields: string): Promise<User | null> {
        try {
            // Construisez la requête SQL pour sélectionner l'utilisateur par ID
            let query = `SELECT ${fields} FROM utilisateurs WHERE id = ?`;

            // Exécutez la requête avec l'ID fourni
            const [rows] = await configDB.execute(query, [userId]);

            // Si des lignes sont renvoyées, créez un nouvel objet User avec les données de la première ligne
            return rows.length ? new User(rows[0]) : null;
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }

    async comparePassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.user.password);
    }

    getId(): number {
        if (this.user.id === undefined) {
            // Gérer le cas où l'ID est indéfini
            throw new Error("ID is undefined");
        }
        return this.user.id;
    }

    getUsername(): string {
        return this.user.username;
    }

    getEmail(): string {
        return this.user.email;
    }
}

export default User;