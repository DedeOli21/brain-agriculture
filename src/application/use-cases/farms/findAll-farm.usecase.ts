import { Injectable } from '@nestjs/common';
import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';

@Injectable()
export class FindAllFarmUseCase {
  constructor(private readonly farmRepository: IFarmRepository) {}

  async execute(
    findAllFarmQueryRequestDto: FindAllFarmQueryRequestDto,
  ): Promise<FindAllFarmResponseDto> {
    return await this.farmRepository.findAll(findAllFarmQueryRequestDto);
  }
}
