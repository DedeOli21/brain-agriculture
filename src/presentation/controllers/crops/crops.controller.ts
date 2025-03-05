import { Controller, Post, Body } from '@nestjs/common';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';
import { Crop } from '@domain/entities/crops/crop.entity';
import { CreateCropUseCase } from '@app/use-cases/crops/create-crops.usecase';

@Controller('crops')
export class CropsController {
  constructor(private readonly createCropUseCase: CreateCropUseCase) {}

  @Post()
  async create(@Body() data: CreateCropDto): Promise<Crop> {
    return this.createCropUseCase.execute(data);
  }
}
