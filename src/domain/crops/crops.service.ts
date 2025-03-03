import { Injectable, NotFoundException } from '@nestjs/common';
// import { CropRepository } from './repositories/crop.repository';
import { CreateCropDto } from './dtos/create-crop.dto';
import { Crop } from './crop.entity';
import { SeasonRepository } from '../season/season.repository';
import { ISeasonRepository } from '../season/season.repository.interface';


@Injectable()
export class CreateCropUseCase {
  constructor(
    // private readonly cropRepository: CropRepository,
    private readonly seasonRepository: SeasonRepository,
  ) {}

  async execute(data: CreateCropDto): Promise<Crop> {
    // Validar se a safra existe

    console.log('data', data);
    const season = await this.seasonRepository.findById({ id: data.seasonId });
    if (!season) {
      throw new NotFoundException('Safra não encontrada');
    }

    // Criar a cultura plantada
    // const crop = await this.cropRepository.create({
    //   name: data.name,
    //   season,
    // });
    const crop = new Crop();
    return crop;
  }
}
