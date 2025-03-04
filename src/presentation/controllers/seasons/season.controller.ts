import { Controller, Post, Body } from '@nestjs/common';
import { CreateSeasonUseCase } from '@app/use-cases/season/create-season.usecase';
import { CreateSeasonDto } from '@app/use-cases/season/dto/create-season.dto';
import { Season } from 'src/domain/entities/season/season.entity';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly createSeasonUseCase: CreateSeasonUseCase) {}

  @Post()
  async create(@Body() data: CreateSeasonDto): Promise<Season> {
    return this.createSeasonUseCase.execute(data);
  }
}
