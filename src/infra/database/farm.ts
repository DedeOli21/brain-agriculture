import { InjectRepository } from '@nestjs/typeorm';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Repository } from 'typeorm';

export class FarmImplementation implements IFarmRepository {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  create(payload: any): any {
    return this.farmRepository.save(payload);
  }

  findFarmByName(document: string): any {
    return this.farmRepository.findOneBy({ name: document });
  }

  findFarmById(id: string): any {
    return this.farmRepository.findOneBy({ id: id });
  }

  findAll(): any {
    return this.farmRepository.find({
      relations: ['seasons', 'seasons.crops', 'seasons.crops.harvests'],
    });
  }

  count(): Promise<number> {
    return this.farmRepository.count();
  }

  totalArea(): Promise<number> {
    return this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'total')
      .getRawOne();
  }

  countByState(): Promise<any[]> {
    return this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state, COUNT(*) as count')
      .groupBy('farm.state')
      .getRawMany();
  }

  totalArableAndVegetationArea(): Promise<any> {
    return this.farmRepository
      .createQueryBuilder('farm')
      .select([
        `SUM(farm.arableArea) as arableArea`,
        `SUM(farm.vegetationArea) as vegetationArea`,
      ])
      .groupBy('farm.id')
      .getRawOne();
  }
}
