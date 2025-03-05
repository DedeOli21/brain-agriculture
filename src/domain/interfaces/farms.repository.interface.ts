import { Farm } from 'src/domain/entities/farms/farm.entity';
import { CreateFarmResponseDto } from '../../application/use-cases/farms/dto/response/create-request.dto';
import { FindAllFarmQueryRequestDto } from '../../application/use-cases/farms/dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from '../../application/use-cases/farms/dto/response/findAll-response.dto';

export abstract class IFarmRepository {
  create: (payload: any) => Promise<CreateFarmResponseDto>;
  findAll: (
    payload?: FindAllFarmQueryRequestDto,
  ) => Promise<FindAllFarmResponseDto>;
  findFarmById: (id: string) => Promise<Farm>;
  findFarmByName: (name: string) => Promise<Farm>;
  count: () => Promise<number>;
  totalArea: () => Promise<any>;
  countByState: () => Promise<any>;
  totalArableAndVegetationArea: () => Promise<any>;
}
