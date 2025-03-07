import { Controller, Post, Body } from '@nestjs/common';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';
import { Crop } from '@domain/entities/crops/crop.entity';
import { CreateCropUseCase } from '@app/use-cases/crops/create-crops.usecase';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCropResponseDto } from '@app/use-cases/crops/dtos/create-crop-response.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly createCropUseCase: CreateCropUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a crop' })
  @ApiResponse({ 
    status: 201, 
    description: 'The crop has been successfully created', 
    type: CreateCropResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad Request' 
  })
  async create(@Body() data: CreateCropDto): Promise<CreateCropResponseDto> {
    return this.createCropUseCase.execute(data);
  }
}
