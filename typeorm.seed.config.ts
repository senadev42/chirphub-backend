// typeorm.config.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
    type: 'postgres', 
    // db config
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DBNAME,

    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/seeders/**/*.ts'],
    migrationsTableName: 'seedings',
    ssl: process.env.NEONDB == 'true' || false,
});