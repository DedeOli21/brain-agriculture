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
    const totalFarms = await this.farmRepository.count();

    const totalHectares = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'total')
      .getRawOne();

    const farmsByState = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state, COUNT(*) as count')
      .groupBy('farm.state')
      .getRawMany();

    const cropsDistribution = await this.cropRepository
      .createQueryBuilder('crop')
      .select('crop.name, COUNT(*) as count')
      .groupBy('crop.name')
      .getRawMany();

    const landUsage = await this.farmRepository
      .createQueryBuilder('farm')
      .select([
        `SUM(farm.arableArea) as arableArea`,
        `SUM(farm.vegetationArea) as vegetationArea`,
      ])
      .groupBy('farm.id')
      .getRawOne()


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
