import { Injectable, NotFoundException } from '@nestjs/common';
import { ICropRepository } from 'src/application/interfaces/crop.repository.interface';
import { IHarvestRepository } from 'src/application/interfaces/harvest.repository.interface';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { CreateHarvestResponseDto } from './dto/create-harvest-response.dto';

@Injectable()
export class CreateHarvestUseCase {
  constructor(
    private readonly harvestRepository: IHarvestRepository,
    private readonly cropRepository: ICropRepository,
  ) {}

  async execute(data: CreateHarvestDto): Promise<CreateHarvestResponseDto> {
    // Validar se a cultura existe
    const crop = await this.cropRepository.findById(data.cropId);
    if (!crop) {
      throw new NotFoundException('Cultura não encontrada');
    }

    // Criar a colheita
    const harvest = await this.harvestRepository.create({
      amount: data.amount,
      harvestDate: data.harvestDate,
      crop,
    });

    return harvest;
  }
}
