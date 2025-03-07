import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_HOST || 'localhost',
  port: process.env.DATABASE_URL ? undefined : Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_USERNAME || 'admin',
  password: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_PASSWORD || 'password',
  database: process.env.DATABASE_URL ? undefined : process.env.TYPEORM_DATABASE || 'brain_agriculture',
  entities: isProduction
    ? ['dist/src/domain/entities/**/*.entity{.ts,.js}']  // Para produção (Railway)
    : ['src/domain/entities/**/*.entity{.ts,.js}'], // Para desenvolvimento local
  migrations: isProduction
    ? ['dist/src/migrations/*{.ts,.js}']
    : ['src/migrations/*{.ts,.js}'],
  synchronize: false, // Nunca use true em produção
  migrationsRun: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
