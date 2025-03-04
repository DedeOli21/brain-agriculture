import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';
import { Crop } from '@domain/entities/crops/crop.entity';
import { ISeasonRepository } from '@domain/interfaces/season.repository.interface';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';

@Injectable()
export class CreateCropUseCase {
  constructor(
    private readonly cropRepository: ICropRepository,
    private readonly seasonRepository: ISeasonRepository,
  ) {}

  async execute(data: CreateCropDto): Promise<Crop> {
    // Validar se a safra existe

    const season = await this.seasonRepository.findById({ id: data.seasonId });
    if (!season) {
      throw new NotFoundException('Safra não encontrada');
    }

    // Criar a cultura plantada
    const crop = await this.cropRepository.create({
      name: data.name,
      season,
    });

    return crop;
  }
}
