import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from '@presentation/presentation.module';
import { ApplicationModule } from '@app/application.module';
import { DataBaseConnectionService } from '@shared/databases/database.config';
import { DatabaseModule } from '@infra/database/database.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    ApplicationModule,
    PresentationModule,
    DatabaseModule,
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
})
export class AppModule {}
