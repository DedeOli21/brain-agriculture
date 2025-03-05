import { Module } from '@nestjs/common';
import { FarmsModule } from '@app/use-cases/farms/farms.module';
import { HarvestModule } from '@app/use-cases/harvest/harvest.module';
import { SeasonModule } from '@app/use-cases/season/season.module';
import { CropsModule } from '@app/use-cases/crops/crops.module';
import { DashboardModule } from '@app/use-cases/dashboard/dashboard.module';
import { ProducersModule } from '@app/use-cases/producers/producers.module';

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
