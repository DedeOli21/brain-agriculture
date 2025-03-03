import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IHarvestRepository } from 'src/application/interfaces/harvest.repository.interface'
import { Harvest } from 'src/domain/harvest/harvest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HarvestImplementation implements IHarvestRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repository: Repository<Harvest>,
  ) {}

  async create(harvest: Partial<Harvest>): Promise<Harvest> {
    return this.repository.save(harvest);
  }
}
