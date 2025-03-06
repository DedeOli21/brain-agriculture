import { CreateFarmResponseDto } from '../../application/use-cases/farms/dto/response/create-response.dto';
import { FindAllFarmQueryRequestDto } from '../../application/use-cases/farms/dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from '../../application/use-cases/farms/dto/response/findAll-response.dto';
import { CreateFarmRequestDto } from '@app/use-cases/farms/dto/request/create-request.dto';
import { FindFarmResponseDto } from '@app/use-cases/farms/dto/response/findById-response.dto';
import { TotalAreaDto } from '@app/use-cases/farms/dto/response/totalArea-response.dto';
import { CountByStateResponseDto } from '@app/use-cases/farms/dto/response/countByState-response.dto';
import { TotalArableAndVegetationAreaDto } from '@app/use-cases/farms/dto/response/totalArable-response.dto';

export abstract class IFarmRepository {
  create: (payload: CreateFarmRequestDto) => Promise<CreateFarmResponseDto>;
  findAll: (
    payload?: FindAllFarmQueryRequestDto,
  ) => Promise<FindAllFarmResponseDto>;
  findFarmById: (id: string) => Promise<FindFarmResponseDto>;
  findFarmByName: (name: string) => Promise<FindFarmResponseDto>;
  count: () => Promise<number>;
  totalArea: () => Promise<TotalAreaDto>;
  countByState: () => Promise<CountByStateResponseDto[]>;
  totalArableAndVegetationArea: () => Promise<TotalArableAndVegetationAreaDto>;
}
