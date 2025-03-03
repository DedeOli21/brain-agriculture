import { Controller, Post, Body } from '@nestjs/common';
import { CreateCropUseCase } from './crops.service';
import { CreateCropDto } from './dtos/create-crop.dto';
import { Crop } from './crop.entity';


@Controller('crops')
export class CropsController {
  constructor(private readonly createCropUseCase: CreateCropUseCase) {}

  @Post()
  async create(@Body() data: CreateCropDto): Promise<Crop> {
    console.log('data', data);
    return this.createCropUseCase.execute(data);
  }
}
