import { InjectRepository } from '@nestjs/typeorm';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Repository } from 'typeorm';
import { CreateFarmRequestDto } from '@app/use-cases/farms/dto/request/create-request.dto';
import { CreateFarmResponseDto } from '@app/use-cases/farms/dto/response/create-response.dto';
import { TotalAreaDto } from '@app/use-cases/farms/dto/response/totalArea-response.dto';
import { CountByStateResponseDto } from '@app/use-cases/farms/dto/response/countByState-response.dto';
import { TotalArableAndVegetationAreaDto } from '@app/use-cases/farms/dto/response/totalArable-response.dto';
import { FindFarmResponseDto } from '@app/use-cases/farms/dto/response/findById-response.dto';

export class FarmImplementation implements IFarmRepository {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  create(payload: CreateFarmRequestDto): Promise<CreateFarmResponseDto> {
    console.log('PAYLOAD', payload);

    const farm = this.farmRepository.create({
      ...payload,
      seasons: [],
    });
    return this.farmRepository.save(payload);
  }

  findFarmByName(document: string): Promise<FindFarmResponseDto> {
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

  totalArea(): Promise<TotalAreaDto> {
    return this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'total')
      .getRawOne();
  }

  countByState(): Promise<CountByStateResponseDto[]> {
    return this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state, COUNT(*) as count')
      .groupBy('farm.state')
      .getRawMany();
  }

  totalArableAndVegetationArea(): Promise<TotalArableAndVegetationAreaDto> {
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
