import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { globSync } from 'glob';
import { join } from 'path';

config();

const isProduction = process.env.NODE_ENV === 'production';

const entityPath = isProduction
  ? globSync(join(__dirname, '..', 'domain', 'entities', '**', '*.entity.{ts,js}'))
  : globSync(join(__dirname, '..', '..', 'domain', 'entities', '**', '*.entity.{ts,js}'));

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_HOST || 'localhost',
  port: process.env.DATABASE_URL ? undefined : Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_USERNAME || 'admin',
  password: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_PASSWORD || 'password',
  database: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_DATABASE || 'brain_agriculture',
  entities: entityPath,
  migrations: isProduction
    ? ['dist/migrations/*.js']
    : ['src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true,
  ssl: false,
});

console.log('📦 Configuração do TypeORM carregada com sucesso.');
