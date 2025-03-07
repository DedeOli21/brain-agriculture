import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateFarmUseCase } from '@app/use-cases/farms/create-farm.usecase';
import { FindAllFarmUseCase } from '@app/use-cases/farms/findAll-farm.usecase';
import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { CreateFarmRequestDto } from './dto/request/create-request.dto';
import { CreateFarmResponseDto } from './dto/response/create-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('farms')
export class FarmsController {
  constructor(
    private readonly createFarmUsecase: CreateFarmUseCase,
    private readonly findAllFarmUsecase: FindAllFarmUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Find all farms' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The farms has been successfully retrieved',
    type: FindAllFarmResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiOperation({
    summary: 'Find all farms',
    description: 'This endpoint is used to find all farms',
  })
  async findAll(
    @Query()
    input: FindAllFarmQueryRequestDto,
  ): Promise<FindAllFarmResponseDto> {
    return this.findAllFarmUsecase.execute(input);
  }

  @Post()
  @ApiOperation({ summary: 'Create a farm' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The farm has been successfully created',
    type: CreateFarmResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  async create(
    @Body() payload: CreateFarmRequestDto,
  ): Promise<CreateFarmResponseDto> {
    return this.createFarmUsecase.execute(payload);
  }
}
