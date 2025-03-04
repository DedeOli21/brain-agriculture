import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Crop } from '@domain/entities/crops/crop.entity';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Producer } from '@domain/entities/producers/producer.entity';
import { Harvest } from '@domain/entities/harvest/harvest.entity';
import { Season } from '@domain/entities/season/season.entity';
import { PresentationModule } from '@presentation/presentation.module';
import { ApplicationModule } from '@app/application.module';

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
      entities: [Producer, Farm, Season, Crop, Harvest],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ApplicationModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
