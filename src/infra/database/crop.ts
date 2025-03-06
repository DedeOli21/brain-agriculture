import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { Crop } from '@domain/entities/crops/crop.entity';
import { Repository } from 'typeorm';
import { CountByCropDto } from '@app/use-cases/crops/dtos/CountByCrop-response.dto';
import { FindCropByIdResponseDto } from '@app/use-cases/crops/dtos/FindCropById-response.dto';
import { CreateCropResponseDto } from '@app/use-cases/crops/dtos/create-crop-response.dto';

@Injectable()
export class CropImplementation implements ICropRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
  ) {}

  async create(crop: Partial<Crop>): Promise<CreateCropResponseDto> {
    return this.repository.save(crop);
  }

  async findById(id: string): Promise<FindCropByIdResponseDto> {
    return this.repository.findOneBy({ id });
  }

  async countByCrop(): Promise<CountByCropDto[]> {
    return this.repository
      .createQueryBuilder('crop')
      .select('crop.name, COUNT(*) as count')
      .groupBy('crop.name')
      .getRawMany();
  }
}
