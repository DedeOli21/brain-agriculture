import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISeasonRepository } from './season.repository.interface';
import { Season } from './season.entity';

@Injectable()
export class SeasonRepository implements ISeasonRepository {
  constructor(
    @InjectRepository(Season)
    private readonly repository: Repository<Season>,
  ) {}

  async create(season: Partial<Season>): Promise<Season> {
    return this.repository.save(season);
  }

  async findById(id: Partial<Season>): Promise<Season> {
    return this.repository.findOne({ where: id });
  }
}
