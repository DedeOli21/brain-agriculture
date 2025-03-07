import { Crop } from '@domain/entities/crops/crop.entity';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Harvest } from '@domain/entities/harvest/harvest.entity';
import { Producer } from '@domain/entities/producers/producer.entity';
import { Season } from '@domain/entities/season/season.entity';
import { DataSource } from 'typeorm';

console.log('Entities being loaded:', [Producer, Farm, Crop, Harvest, Season]);

const datasource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'brain_agriculture',
  entities: [Producer, Farm, Crop, Season, Harvest],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  migrationsRun: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export default datasource;
