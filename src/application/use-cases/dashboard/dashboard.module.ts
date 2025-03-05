import { Module } from '@nestjs/common';
import { DashboardController } from '@presentation/controllers/dashboard/dashboard.controller';
import { GetDashboardUseCase } from './get-dashboard.usecase';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DashboardController],
  providers: [GetDashboardUseCase],
})
export class DashboardModule {}
