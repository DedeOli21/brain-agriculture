import { Injectable, NotFoundException } from '@nestjs/common';
import { ISeasonRepository } from '@domain/interfaces/season.repository.interface';
import { Season } from '@domain/entities/season/season.entity';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { CreateSeasonDto } from '@app/use-cases/season/dto/create-season.dto';

@Injectable()
export class CreateSeasonUseCase {
  constructor(
    private readonly seasonRepository: ISeasonRepository,
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute(data: CreateSeasonDto): Promise<Season> {
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
