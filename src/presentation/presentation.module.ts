import { Module } from '@nestjs/common';
import { FarmsController } from '@presentation/controllers/farms/farms.controller';
import { HarvestController } from '@presentation/controllers/harvest/harvest.controller';
import { CropsController } from '@presentation/controllers/crops/crops.controller';
import { SeasonController } from '@presentation/controllers/seasons/season.controller';

import { ProducersController } from '@presentation/controllers/producers/producers.controller';
import { ApplicationModule } from '@app/application.module';
import { DashboardController } from './controllers/dashboard/dashboard.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    FarmsController,
    HarvestController,
    ProducersController,
    CropsController,
    SeasonController,
    DashboardController,
  ],
})
export class PresentationModule {}
