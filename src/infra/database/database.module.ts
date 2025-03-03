import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'src/domain/producers/producer.entity';
import { IProducerRepository } from 'src/application/interfaces/producers.repository.interface';
import { IHarvestRepository } from 'src/application/interfaces/harvest.repository.interface';
import { ICropRepository } from 'src/application/interfaces/crop.repository.interface';
import { ProducerImplementation } from './producer';
import { Farm } from 'src/domain/farms/farm.entity';
import { IFarmRepository } from 'src/application/use-cases/farms/farms.interface';
import { FarmImplementation } from './farm';
import { HarvestImplementation } from './harvest';
import { Harvest } from 'src/domain/harvest/harvest.entity';
import { Season } from 'src/domain/season/season.entity';
import { CropImplementation } from 'src/domain/crops/repositories/crop.repository';
import { Crop } from 'src/domain/crops/crop.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Season, Harvest, Crop])],
  providers: [
    { provide: IProducerRepository, useClass: ProducerImplementation },
    { provide: IFarmRepository, useClass: FarmImplementation },
    { provide: IHarvestRepository, useClass: HarvestImplementation },
    { provide: ICropRepository, useClass: CropImplementation },
  ],
  exports: [IProducerRepository, IFarmRepository, IHarvestRepository, ICropRepository],
})
export class DatabaseModule {}
