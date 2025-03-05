import { Controller, Get } from '@nestjs/common';
import { GetDashboardUseCase } from '@app/use-cases/dashboard/get-dashboard.usecase';
import { DashboardResponseDto } from '@app/use-cases/dashboard/dto/dashboard-response.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardService: GetDashboardUseCase) {}

  @Get()
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.getDashboardService.execute();
  }
}
