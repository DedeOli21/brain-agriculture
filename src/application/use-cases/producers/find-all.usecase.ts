import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { FindAllProducerResponseDto } from './dto/response/findAll-reponse.dto';
import { FindAllProducerQueryRequestDto } from './dto/request/findAll-request.dto';

@Injectable()
export class FindAllProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(
    input: FindAllProducerQueryRequestDto,
  ): Promise<FindAllProducerResponseDto> {
    const { producers, total } = await this.producerRepository.findAll(input);

    return {
      producers,
      total,
    };
  }
}
