import { Injectable } from '@nestjs/common';
import { DashboardResponseDto } from '@app/use-cases/dashboard/dto/dashboard-response.dto';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';

@Injectable()
export class GetDashboardUseCase {
  constructor(
    private readonly farmRepository: IFarmRepository,
    private readonly cropRepository: ICropRepository,
  ) {}

  async execute(): Promise<DashboardResponseDto> {
    const totalFarms = await this.farmRepository.count();

    const totalHectares = await this.farmRepository.totalArea();

    const farmsByState = await this.farmRepository.countByState();

    const cropsDistribution = await this.cropRepository.countByCrop();

    const landUsage = await this.farmRepository.totalArableAndVegetationArea();

    return {
      totalFarms,
      totalHectares: totalHectares.total || 0,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arablearea || 0 },
        { type: 'Área de Vegetação', area: landUsage.vegetationarea || 0 },
      ],
    };
  }
}
