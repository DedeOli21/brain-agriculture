import { Controller, Post, Body } from '@nestjs/common';
import { CreateHarvestUseCase } from '../../../application/use-cases/harvest/create-harvest.usecase';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { Harvest } from '../../../domain/entities/harvest/harvest.entity';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly createHarvestUseCase: CreateHarvestUseCase) {}

  @Post()
  async create(@Body() data: CreateHarvestDto): Promise<Harvest> {
    return this.createHarvestUseCase.execute(data);
  }
}
