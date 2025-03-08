import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { Crop } from '@domain/entities/crops/crop.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { CountByCropDto } from '@app/use-cases/crops/dtos/CountByCrop-response.dto';
import { FindCropByIdResponseDto } from '@app/use-cases/crops/dtos/FindCropById-response.dto';
import { CreateCropResponseDto } from '@app/use-cases/crops/dtos/create-crop-response.dto';
import { GetAllCropsResponseDto } from '@app/use-cases/crops/dtos/getAll-crop-response.dto';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';

@Injectable()
export class CropImplementation implements ICropRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
  ) {}

  async create(crop: CreateCropDto): Promise<CreateCropResponseDto> {
    const mewCrop = this.repository.create({
      ...crop,
      season: crop.seasonId
    });

    console.log('NEW CROP', mewCrop);

    const result = await this.repository.createQueryBuilder().insert().values(mewCrop).execute();

    return result.raw;
  }

  async findById(id: string): Promise<FindCropByIdResponseDto> {
    return this.repository.findOneBy({ id });
  }

  async countByCrop(): Promise<CountByCropDto[]> {
    const result = await this.repository
      .createQueryBuilder('crop')
      .select('crop.name, COUNT(*) as count')
      .groupBy('crop.name')
      .getRawMany();

    return result;
  }

  async getAllCrops(): Promise<GetAllCropsResponseDto[]> {
    return this.repository.find();
  }
}
