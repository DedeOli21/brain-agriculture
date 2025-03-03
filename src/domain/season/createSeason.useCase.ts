import { Injectable, NotFoundException } from '@nestjs/common';
import { SeasonRepository } from './season.repository';
import { CreateSeasonDto } from './dto/create-season.dto';
import { Season } from './season.entity';
import { IFarmRepository } from 'src/application/use-cases/farms/farms.interface';

@Injectable()
export class CreateSeasonUseCase {
  constructor(
    private readonly seasonRepository: SeasonRepository,
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
