import { Controller, Get } from '@nestjs/common';
import { GetDashboardUseCase } from '@app/use-cases/dashboard/get-dashboard.usecase';
import { DashboardResponseDto } from '@app/use-cases/dashboard/dto/dashboard-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardService: GetDashboardUseCase) {}

  @Get('all-data')
  @ApiOperation({ summary: 'Get all data from dashboard' })
  @ApiResponse({ 
    status: 200, 
    description: 'The data has been successfully retrieved', 
    type: DashboardResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request' 
  })
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.getDashboardService.execute();
  }
}
