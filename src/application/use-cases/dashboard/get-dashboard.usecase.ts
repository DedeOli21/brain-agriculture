import { Injectable } from '@nestjs/common';
import { DashboardResponseDto } from '@app/use-cases/dashboard/dto/dashboard-response.dto';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';

@Injectable()
export class GetDashboardUseCase {
  constructor(
    private readonly farmRepository: IFarmRepository,
    private readonly cropRepository: ICropRepository,
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(): Promise<DashboardResponseDto> {
    const [
      totalFarms,
      totalHectares,
      farmsByState,
      cropsDistribution,
      landUsage,
      totalProducers,
    ] = await Promise.all([
      this.farmRepository.count(),
      this.farmRepository.totalArea(),
      this.farmRepository.countByState(),
      this.cropRepository.countByCrop(),
      this.farmRepository.totalArableAndVegetationArea(),
      this.producerRepository.findAll(),
    ]);

    return {
      totalProducers: totalProducers.total || 0,
      totalFarms,
      totalHectares: totalHectares.total || 0,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage?.arablearea || 0 },
        { type: 'Área de Vegetação', area: landUsage?.vegetationarea || 0 },
      ],
    };
  }
}
