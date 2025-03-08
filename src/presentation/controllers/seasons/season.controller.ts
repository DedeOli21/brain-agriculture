import { Controller, Post, Body } from '@nestjs/common';
import { CreateSeasonUseCase } from '@app/use-cases/season/create-season.usecase';
import { CreateSeasonDto } from '@app/use-cases/season/dto/create-season.dto';
import { Season } from 'src/domain/entities/season/season.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly createSeasonUseCase: CreateSeasonUseCase) {}

  @ApiOperation({ summary: 'Create a season' })
  @ApiResponse({
    status: 201,
    description: 'The season has been successfully created',
    type: Season,
  })
  @Post()
  async create(@Body() data: CreateSeasonDto): Promise<Season> {
    return this.createSeasonUseCase.execute(data);
  }
}
