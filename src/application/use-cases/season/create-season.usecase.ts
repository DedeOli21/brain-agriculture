import { Injectable, NotFoundException } from '@nestjs/common';
import { ISeasonRepository } from 'src/domain/interfaces/season.repository.interface';
import { CreateSeasonDto } from './dto/create-season.dto';
import { Season } from 'src/domain/entities/season/season.entity';
import { IFarmRepository } from 'src/domain/interfaces/farms.repository.interface';

@Injectable()
export class CreateSeasonUseCase {
  constructor(
    private readonly seasonRepository: ISeasonRepository,
    private readonly farmRepository: IFarmRepository,
  ) {}

  async execute(data: CreateSeasonDto): Promise<Season> {
    // Validar se a fazenda existe
    const farm = await this.farmRepository.findFarmById(data.farmId);
    if (!farm) {
      throw new NotFoundException('Fazenda não encontrada');
    }

    // Criar a safra
    const season = await this.seasonRepository.create({
      name: data.name,
      year: data.year,
      farm,
    });

    return season;
  }
}
