import { Controller, Post, Body } from '@nestjs/common';
import { CreateSeasonUseCase } from './createSeason.useCase';
import { CreateSeasonDto } from './dto/create-season.dto';
import { Season } from './season.entity';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly createSeasonUseCase: CreateSeasonUseCase) {}

  @Post()
  async create(@Body() data: CreateSeasonDto): Promise<Season> {
    return this.createSeasonUseCase.execute(data);
  }
}
