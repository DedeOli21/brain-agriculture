import { Module } from '@nestjs/common';

import { FarmsModule } from './use-cases/farms/farms.module';
import { HarvestModule } from './use-cases/harvest/harvest.module';
import { SeasonModule } from './use-cases/season/season.module';
import { CropsModule } from './use-cases/crops/crops.module';
import { DashboardModule } from './use-cases/dashboard/dashboard.module';
import { ProducersModule } from './use-cases/producers/producers.module';

const usecases = [
  ProducersModule,
  FarmsModule,
  DashboardModule,
  HarvestModule,
  CropsModule,
  SeasonModule,
];

@Module({
  imports: usecases,
  exports: usecases,
})
export class ApplicationModule {}
