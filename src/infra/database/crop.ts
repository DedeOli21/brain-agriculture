import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICropRepository } from 'src/domain/interfaces/crop.repository.interface2';
import { Crop } from 'src/domain/entities/crops/crop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CropImplementation implements ICropRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
  ) {}

  async create(crop: Partial<Crop>): Promise<Crop> {
    return this.repository.save(crop);
  }

  async findById(id: string): Promise<Crop> {
    return this.repository.findOneBy({ id });
  }
}
