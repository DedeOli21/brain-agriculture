import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { IHarvestRepository } from '@domain/interfaces/harvest.repository.interface';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { ISeasonRepository } from '@domain/interfaces/season.repository.interface';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Producer } from '@domain/entities/producers/producer.entity';
import { Harvest } from '@domain/entities/harvest/harvest.entity';
import { Season } from '@domain/entities/season/season.entity';
import { Crop } from '@domain/entities/crops/crop.entity';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { ProducerImplementation } from './producer';
import { FarmImplementation } from './farm';
import { HarvestImplementation } from './harvest';
import { CropImplementation } from './crop';
import { SeasonImplementation } from './season';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Season, Harvest, Crop])],
  providers: [
    { provide: IProducerRepository, useClass: ProducerImplementation },
    { provide: IFarmRepository, useClass: FarmImplementation },
    { provide: IHarvestRepository, useClass: HarvestImplementation },
    { provide: ICropRepository, useClass: CropImplementation },
    { provide: ISeasonRepository, useClass: SeasonImplementation },
  ],
  exports: [
    IProducerRepository,
    IFarmRepository,
    IHarvestRepository,
    ICropRepository,
    ISeasonRepository,
  ],
})
export class DatabaseModule {}
