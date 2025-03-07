import { Controller, Post, Body } from '@nestjs/common';
import { CreateHarvestUseCase } from '@app/use-cases/harvest/create-harvest.usecase';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { Harvest } from '@domain/entities/harvest/harvest.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly createHarvestUseCase: CreateHarvestUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a harvest' })
  @ApiResponse({
    status: 201,
    description: 'The harvest has been successfully created',
    type: Harvest,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async create(@Body() data: CreateHarvestDto): Promise<Harvest> {
    return this.createHarvestUseCase.execute(data);
  }
}
