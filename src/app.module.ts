import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Crop } from './domain/crops/crop.entity';
import { Farm } from './domain/farms/farm.entity';
import { Producer } from './domain/producers/producer.entity';
import { HarvestToCrop } from './domain/harvest-to-crop /harvest-to-crop.entity';
import { Harvest } from './domain/harverst/harvest.entity';
import { DomainModule } from './domain/domain.module';

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
      entities: [Crop, Farm, Producer, HarvestToCrop, Harvest],
      autoLoadEntities: true,
      synchronize: true,
    }),
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
