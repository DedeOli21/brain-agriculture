import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { FindAllProducerResponseDto } from './dto/response/findAll-reponse.dto';

@Injectable()
export class FindAllProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(): Promise<FindAllProducerResponseDto[]> {
    return await this.producerRepository.findAll();
  }
}
