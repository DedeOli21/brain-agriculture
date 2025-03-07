import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Producer } from '@domain/entities/producers/producer.entity';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Crop } from '@domain/entities/crops/crop.entity';
import { Season } from '@domain/entities/season/season.entity';
import { Harvest } from '@domain/entities/harvest/harvest.entity';

config();

console.log('Entities being loaded:', [Producer, Farm, Crop, Season, Harvest]);

const datasource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || undefined,
  host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST || 'localhost',
  port: process.env.DATABASE_URL ? undefined : Number(process.env.DB_PORT) || 5432,
  username: process.env.DATABASE_URL ? undefined : process.env.DB_USERNAME || 'admin',
  password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD || 'password',
  database: process.env.DATABASE_URL ? undefined : process.env.DB_DATABASE || 'brain_agriculture',
  entities: [Producer, Farm, Crop, Season, Harvest],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  migrationsRun: true,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false } // Railway exige SSL
    : false,
});

export default datasource;
