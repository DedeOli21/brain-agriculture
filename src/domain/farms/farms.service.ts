import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFarmRequestDto } from './dto/request/create-request.dto';
import { IFarmRepository } from 'src/application/farms.interface';
import { IProducerRepository } from 'src/application/producers.interface';
import { FindAllFarmResponseDto } from './dto/response/findAll-response.dto';
import { FindAllFarmQueryRequestDto } from './dto/request/findAll-request.dto';

@Injectable()
export class FarmsService {
  constructor(
    private readonly farmRepository: IFarmRepository,
    private readonly producerRepository: IProducerRepository,
  ) {}

  async create(payload: CreateFarmRequestDto): Promise<any> {
    const { producerId, totalArea, arableArea, vegetationArea } = payload;

    if (!this.isValidArea(totalArea, arableArea, vegetationArea)) {
      throw new BadRequestException(
        `The valid Area and Vegetation must be greater than the total area`,
      );
    }

    const producer = await this.producerRepository.findProducerById(producerId);

    return await this.farmRepository.create({
      ...payload,
      producer,
    });
  }

  async findAll(
    payload: FindAllFarmQueryRequestDto,
  ): Promise<FindAllFarmResponseDto> {
    return await this.farmRepository.findAll(payload);
  }

  private isValidArea(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ): boolean {
    console.log([totalArea, arableArea, vegetationArea]);
    return totalArea >= arableArea + vegetationArea;
  }
}
