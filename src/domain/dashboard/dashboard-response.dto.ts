export class DashboardResponseDto {
  totalFarms: number;
  totalHectares: number;

  farmsByState: { state: string; count: number }[];
  cropsDistribution: { crop: string; count: number }[];
  landUsage: { type: string; area: number }[];
}
