import { Module } from '@nestjs/common';
import { FarmsController } from './controllers/farms/farms.controller';
import { HarvestController } from './controllers/harvest/harvest.controller';
import { CropsController } from './controllers/crops/crops.controller';
import { SeasonController } from './controllers/seasons/season.controller';

import { ProducersController } from 'src/presentation/controllers/producers/producers.controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [
    FarmsController,
    HarvestController,
    ProducersController,
    CropsController,
    SeasonController,
  ],
})
export class PresentationModule {}
