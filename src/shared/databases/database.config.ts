import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { globSync } from 'glob';
import { join } from 'path';

@Injectable()
export class DataBaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

    const isProduction = process.env.NODE_ENV === 'production';

    const entityPath = isProduction
      ? globSync(
          join(__dirname, '..', 'domain', 'entities', '**', '*.entity.js'),
        )
      : globSync(
          join(
            __dirname,
            '..',
            '..',
            'src',
            'domain',
            'entities',
            '**',
            '*.entity.{ts,js}',
          ),
        );

    return {
      type: 'postgres',
      url: databaseUrl || undefined,
      host: databaseUrl
        ? undefined
        : this.configService.get<string>('TYPEORM_HOST'),
      port: databaseUrl
        ? undefined
        : Number(this.configService.get<number>('TYPEORM_PORT')),
      username: databaseUrl
        ? undefined
        : this.configService.get<string>('TYPEORM_USERNAME'),
      password: databaseUrl
        ? undefined
        : this.configService.get<string>('TYPEORM_PASSWORD'),
      database: databaseUrl
        ? undefined
        : this.configService.get<string>('TYPEORM_DATABASE'),
      entities: entityPath,
      migrations: isProduction
        ? globSync(join(__dirname, '..', 'migrations', '*.js'))
        : globSync(
            join(__dirname, '..', '..', 'src', 'migrations', '*.{ts,js}'),
          ),
      synchronize: false,
      migrationsRun: true,
      autoLoadEntities: true,
      logging: true,
    };
  }
}
