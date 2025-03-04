import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISeasonRepository } from '../../domain/interfaces/season.repository.interface';
import { Season } from '../../domain/entities/season/season.entity';

@Injectable()
export class SeasonImplementation implements ISeasonRepository {
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
