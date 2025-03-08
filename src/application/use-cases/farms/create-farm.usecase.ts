import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { CreateFarmRequestDto } from './dto/request/create-request.dto';
import { CreateFarmResponseDto } from './dto/response/create-response.dto';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private readonly farmRepository: IFarmRepository,
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(payload: CreateFarmRequestDto): Promise<CreateFarmResponseDto> {
    const { producerId, totalArea, arableArea, vegetationArea } = payload;

    if (!this.isValidArea(totalArea, arableArea, vegetationArea)) {
      throw new BadRequestException(
        `The valid Area and Vegetation must be greater than the total area`,
      );
    }

    const producer = await this.producerRepository.findProducerById(producerId);

    if (!producer) {
      throw new NotFoundException('Producer not found');
    }

    return await this.farmRepository.create({
      ...payload,
      producerId: producer.id,
    });
  }

  private isValidArea(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ): boolean {
    return totalArea >= arableArea + vegetationArea;
  }
}
