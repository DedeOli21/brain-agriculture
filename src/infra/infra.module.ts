import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from 'src/domain/entities/crops/crop.entity';
import { Farm } from 'src/domain/entities/farms/farm.entity';
import { Harvest } from 'src/domain/entities/harvest/harvest.entity';
import { Producer } from 'src/domain/entities/producers/producer.entity';
import { Season } from 'src/domain/entities/season/season.entity';
import { FarmImplementation } from './database/farm';
import { CropImplementation } from './database/crop';
import { ProducerImplementation } from './database/producer';
import { SeasonImplementation } from './database/season';
import { HarvestImplementation } from './database/harvest';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Crop, Producer, Season, Harvest])],
  providers: [
    { provide: 'IFarmRepository', useClass: FarmImplementation },
    { provide: 'ICropRepository', useClass: CropImplementation },
    { provide: 'IProducerRepository', useClass: ProducerImplementation },
    { provide: 'ISeasonRepository', useClass: SeasonImplementation },
    { provide: 'IHarvestRepository', useClass: HarvestImplementation },
  ],
  exports: [
    'IFarmRepository',
    'ICropRepository',
    'IProducerRepository',
    'ISeasonRepository',
    'IHarvestRepository',
  ],
})
export class InfraModule {}
