import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { CreateFarmRequestDto } from './dto/request/create-request.dto';
import { CreateFarmResponseDto } from './dto/response/create-request.dto';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Get()
  async findAll(
    @Query()
    input: FindAllFarmQueryRequestDto,
  ): Promise<FindAllFarmResponseDto> {
    return this.farmsService.findAll(input);
  }

  @Post()
  async create(
    @Body() payload: CreateFarmRequestDto,
  ): Promise<CreateFarmResponseDto> {
    return this.farmsService.create(payload);
  }
}
