import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';
import { ISeasonRepository } from '@domain/interfaces/season.repository.interface';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { CreateCropResponseDto } from './dtos/create-crop-response.dto';

@Injectable()
export class CreateCropUseCase {
  constructor(
    private readonly cropRepository: ICropRepository,
    private readonly seasonRepository: ISeasonRepository,
  ) {}

  async execute(data: CreateCropDto): Promise<CreateCropResponseDto> {
    const season = await this.seasonRepository.findById({ id: data.seasonId });
    if (!season) {
      throw new NotFoundException('Safra não encontrada');
    }

    const crop = await this.cropRepository.create({
      name: data.name,
      season,
    });

    return crop;
  }
}
