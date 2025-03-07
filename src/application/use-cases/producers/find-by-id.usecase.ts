import { BadRequestException, Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { FindOneProducerResponseDto } from './dto/response/findOne-reponse.dto';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(id: string): Promise<FindOneProducerResponseDto> {
    const result = await this.producerRepository.findProducerById(id);

    if (!result) {
      console.log('Producer not found');
      throw new BadRequestException('Producer not found');
    }

    return result;
  }
}
