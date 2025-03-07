import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';

const entityPath = isProduction
  ? ['dist/src/domain/entities/**/*.entity.js']
  : ['src/domain/entities/**/*.entity.ts'];

console.log('🔍 Buscando entidades em:', entityPath);

console.log('isProduction', isProduction);
console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_HOST || 'localhost',
  port: process.env.DATABASE_URL ? undefined : Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_USERNAME || 'admin',
  password: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_PASSWORD || 'password',
  database: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_DATABASE || 'brain_agriculture',
  entities: isProduction
    ? ['dist/src/domain/entities/**/*.entity.js'] // Agora apontando corretamente para dist/src
    : ['src/domain/entities/**/*.entity.ts'], // Caminho correto no desenvolvimento
  migrations: isProduction
    ? ['dist/src/migrations/*.js']
    : ['src/migrations/*.ts'],
  synchronize: false,
  migrationsRun: true
});

export default AppDataSource;
