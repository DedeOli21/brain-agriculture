import { InjectRepository } from '@nestjs/typeorm';
import { IFarmRepository } from 'src/application/farms.interface';
import { Farm } from 'src/domain/farms/farm.entity';
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
}
