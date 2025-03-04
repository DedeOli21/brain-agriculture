import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { IFarmRepository } from 'src/domain/interfaces/farms.repository.interface';

export class FindAllFarmUseCase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(
    findAllFarmQueryRequestDto: FindAllFarmQueryRequestDto,
  ): Promise<FindAllFarmResponseDto> {
    return await this.farmRepository.findAll(findAllFarmQueryRequestDto);
  }
}
