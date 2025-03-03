import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateFarmUseCase } from '../../../application/use-cases/farms/create-farm.usecase';
import { FindAllFarmUseCase } from '../../../application/use-cases/farms/findAll-farm.usecase';
import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { CreateFarmRequestDto } from './dto/request/create-request.dto';
import { CreateFarmResponseDto } from './dto/response/create-request.dto';

@Controller('farms')
export class FarmsController {
  constructor(private readonly createFarmUsecase: CreateFarmUseCase, private readonly findAllFarmUsecase: FindAllFarmUseCase) {}

  @Get()
  async findAll(
    @Query()
    input: FindAllFarmQueryRequestDto,
  ): Promise<FindAllFarmResponseDto> {
    return this.findAllFarmUsecase.execute(input);
  }

  @Post()
  async create(
    @Body() payload: CreateFarmRequestDto,
  ): Promise<CreateFarmResponseDto> {
    return this.createFarmUsecase.execute(payload);
  }
}
