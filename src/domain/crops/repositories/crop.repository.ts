import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from '../crop.entity';
import { ICropRepository } from './crop.repository.interface';

@Injectable()
export class CropImplementation implements ICropRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
  ) {}

  async create(crop: Partial<Crop>): Promise<Crop> {
    return this.repository.save(crop);
  }
}
