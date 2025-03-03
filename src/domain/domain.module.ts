import { Module } from '@nestjs/common';
import { ProducersModule } from './producers/producers.module';
import { FarmsModule } from './farms/farms.module';
import { DashboardModule } from './dashboard/dashboard.module';

const usecases = [ProducersModule, FarmsModule, DashboardModule];

@Module({
  imports: usecases,
  exports: usecases,
})
export class DomainModule {}
