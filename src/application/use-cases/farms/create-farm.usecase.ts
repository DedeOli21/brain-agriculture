import { BadRequestException, Injectable } from '@nestjs/common';
import { Farm } from '@domain/entities/farms/farm.entity';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { CreateFarmRequestDto } from './dto/request/create-request.dto';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private readonly farmRepository: IFarmRepository,
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(payload: CreateFarmRequestDto): Promise<Farm> {
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

  private isValidArea(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ): boolean {
    return totalArea >= arableArea + vegetationArea;
  }
}
