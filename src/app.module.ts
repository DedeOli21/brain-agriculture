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
import { DataBaseConnectionService } from '@shared/databases/database.config';
import { DatabaseModule } from '@infra/database/database.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Producer, Farm, Season, Crop, Harvest]),
    ApplicationModule,
    PresentationModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss.l',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
