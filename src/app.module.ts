import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Crop } from './domain/crops/crop.entity';
import { Farm } from './domain/farms/farm.entity';
import { Producer } from './domain/producers/producer.entity';
import { DomainModule } from './domain/domain.module';
import { Harvest } from './domain/harvest/harvest.entity';
import { Season } from './domain/season/season.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'brain_agriculture',
      entities: [Crop, Farm, Producer, Harvest, Season],
      autoLoadEntities: true,
      synchronize: true,
    }),
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
