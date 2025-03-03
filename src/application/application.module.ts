import { Module } from '@nestjs/common';
import { FarmsModule } from './use-cases/farms/farms.module';
import { HarvestModule } from './use-cases/harvest/harvest.module';
import { ProducersModule } from 'src/domain/producers/producers.module';
import { SeasonModule } from 'src/domain/season/season.module';
import { DashboardModule } from 'src/domain/dashboard/dashboard.module';
import { CropsModule } from 'src/domain/crops/crops.module';

const usecases = [ProducersModule, FarmsModule, DashboardModule, HarvestModule, CropsModule, SeasonModule];

@Module({
  imports: usecases,
  exports: usecases,
})
export class ApplicationModule {}
