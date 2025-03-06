import { Injectable, NotFoundException } from '@nestjs/common';
import { ISeasonRepository } from '@domain/interfaces/season.repository.interface';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { CreateSeasonDto } from '@app/use-cases/season/dto/create-season.dto';
import { CreateSeasonResponseDto } from './dto/create-response.dto';

@Injectable()
export class CreateSeasonUseCase {
  constructor(
    private readonly seasonRepository: ISeasonRepository,
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute(data: CreateSeasonDto): Promise<CreateSeasonResponseDto> {
    const farm = await this.farmRepository.findFarmById(data.farmId);
    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    const season = await this.seasonRepository.create({
      name: data.name,
      year: data.year,
      farm,
    });

    return season;
  }
}
