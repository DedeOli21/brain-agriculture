import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'src/domain/producers/producer.entity';
import { IProducerRepository } from 'src/application/producers.interface';
import { ProducerImplementation } from './producer';
import { Farm } from 'src/domain/farms/farm.entity';
import { IFarmRepository } from 'src/application/farms.interface';
import { FarmImplementation } from './farm';
import { Harvest } from 'src/domain/harvest/harvest.entity';
import { Season } from 'src/domain/season/season.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Season, Harvest])],
  providers: [
    { provide: IProducerRepository, useClass: ProducerImplementation },
    { provide: IFarmRepository, useClass: FarmImplementation },
  ],
  exports: [IProducerRepository, IFarmRepository],
})
export class DatabaseModule {}
