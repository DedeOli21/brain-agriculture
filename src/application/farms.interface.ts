import { FindAllFarmQueryRequestDto } from 'src/domain/farms/dto/request/findAll-request.dto';
import { CreateFarmResponseDto } from 'src/domain/farms/dto/response/create-request.dto';
import { FindAllFarmResponseDto } from 'src/domain/farms/dto/response/findAll-response.dto';
import { Farm } from 'src/domain/farms/farm.entity';

export abstract class IFarmRepository {
  create: (payload: any) => Promise<CreateFarmResponseDto>;
  findAll: (
    payload: FindAllFarmQueryRequestDto,
  ) => Promise<FindAllFarmResponseDto>;
  findFarmById: (id: string) => Promise<Farm>;
  findFarmByName: (name: string) => Promise<Farm>;
}
