import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';
import { CreateFarmResponseDto } from './dto/response/create-request.dto';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { Farm } from 'src/domain/farms/farm.entity';

export abstract class IFarmRepository {
  create: (payload: any) => Promise<CreateFarmResponseDto>;
  findAll: (
    payload?: FindAllFarmQueryRequestDto,
  ) => Promise<FindAllFarmResponseDto>;
  findFarmById: (id: string) => Promise<Farm>;
  findFarmByName: (name: string) => Promise<Farm>;
}
