import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProducerRepository } from 'src/domain/interfaces/producers.repository.interface';
import { IHarvestRepository } from 'src/domain/interfaces/harvest.repository.interface';
import { ICropRepository } from 'src/domain/interfaces/crop.repository.interface';
import { ISeasonRepository } from 'src/domain/interfaces/season.repository.interface';
import { ProducerImplementation } from './producer';
import { FarmImplementation } from './farm';
import { HarvestImplementation } from './harvest';
import { CropImplementation } from './crop';
import { SeasonImplementation } from './season';
import { Farm } from 'src/domain/entities/farms/farm.entity';
import { Producer } from 'src/domain/entities/producers/producer.entity';
import { Harvest } from 'src/domain/entities/harvest/harvest.entity';
import { Season } from 'src/domain/entities/season/season.entity';
import { Crop } from 'src/domain/entities/crops/crop.entity';
import { IFarmRepository } from 'src/domain/interfaces/farms.repository.interface';

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
