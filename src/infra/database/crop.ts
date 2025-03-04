import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface2';
import { Crop } from '@domain/entities/crops/crop.entity';
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

  async countByCrop(): Promise<any> {
    return this.repository
      .createQueryBuilder('crop')
      .select('crop.name, COUNT(*) as count')
      .groupBy('crop.name')
      .getRawMany();
  }
}
