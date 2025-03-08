import { CountByCropDto } from '@app/use-cases/crops/dtos/CountByCrop-response.dto';
import { CreateCropResponseDto } from '@app/use-cases/crops/dtos/create-crop-response.dto';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';
import { FindCropByIdResponseDto } from '@app/use-cases/crops/dtos/FindCropById-response.dto';
import { GetAllCropsResponseDto } from '@app/use-cases/crops/dtos/getAll-crop-response.dto';

export abstract class ICropRepository {
  create: (harvest: CreateCropDto) => Promise<CreateCropResponseDto>;
  findById: (cropId: string) => Promise<FindCropByIdResponseDto>;
  countByCrop: () => Promise<CountByCropDto[]>;
  getAllCrops: () => Promise<GetAllCropsResponseDto[]>;
}
