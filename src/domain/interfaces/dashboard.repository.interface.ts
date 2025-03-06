import { DashboardResponseDto } from '@app/use-cases/dashboard/dto/dashboard-response.dto';

export class IDashboardRepository {
  getDashboard: () => Promise<DashboardResponseDto>;
}
