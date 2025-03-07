import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DataBaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

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
      entities: [this.configService.get<string>('TYPEORM_ENTITIES')],
      synchronize: this.configService.get<boolean>(
        'TYPEORM_SYNCHRONIZE',
        false,
      ),
      migrationsRun: true,
      ssl: databaseUrl ? { rejectUnauthorized: false } : undefined,
    };
  }
}
