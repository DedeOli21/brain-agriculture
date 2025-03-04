import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../../../domain/entities/dashboard/dashboard.service';
import { DashboardResponseDto } from '../../../application/use-cases/dashboard/dto/dashboard-response.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.dashboardService.getDashboard();
  }
}
