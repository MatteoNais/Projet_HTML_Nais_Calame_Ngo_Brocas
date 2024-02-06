import mysql from 'mysql2/promise';

class configDB {
    private static connection: any;
    static async connectUserDB(): Promise<void> {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.MARIADB_HOST || 'brocas.ovh',
                user: process.env.MARIADB_USER || 'root',
                port: 3308,
                password: process.env.MARIADB_PASSWORD || 'ROOTSAGI5A',
                database: process.env.MARIADB_DATABASE || 'WEB_BDD',
            });

            console.log(`MariaDB Connected: ${this.connection.config.host}`);
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }

    static async execute(query: string, params: any[]): Promise<[any, any]> {
        return await this.connection.execute(query, params);
    }
}
export default configDB;