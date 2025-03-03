import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../farms/farm.entity';
import { Crop } from '../crops/crop.entity';
import { DashboardResponseDto } from './dashboard-response.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,

    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async getDashboard(): Promise<DashboardResponseDto> {
    // 1️⃣ Total de fazendas cadastradas
    const totalFarms = await this.farmRepository.count();

    // 2️⃣ Total de hectares registrados
    const totalHectares = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'total')
      .getRawOne();

    // 3️⃣ Gráfico: Distribuição de fazendas por estado
    const farmsByState = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state, COUNT(*) as count')
      .groupBy('farm.state')
      .getRawMany();

    // 4️⃣ Gráfico: Distribuição por cultura plantada
    const cropsDistribution = await this.cropRepository
      .createQueryBuilder('crop')
      .select('crop.name, COUNT(*) as count')
      .groupBy('crop.name')
      .getRawMany();

    // 5️⃣ Gráfico: Uso do solo (área agricultável x vegetação)
    const landUsage = await this.farmRepository
      .createQueryBuilder('farm')
      .select([
        `SUM(farm.arableArea) as arableArea`,
        `SUM(farm.vegetationArea) as vegetationArea`,
      ])
      .getRawOne();

    return {
      totalFarms,
      totalHectares: totalHectares.total || 0,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arableArea || 0 },
        { type: 'Área de Vegetação', area: landUsage.vegetationArea || 0 },
      ],
    };
  }
}
