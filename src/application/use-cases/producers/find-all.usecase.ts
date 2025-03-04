import { Injectable } from '@nestjs/common';
import { IProducerRepository } from 'src/domain/interfaces/producers.repository.interface';

@Injectable()
export class FindAllProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute() {
    return await this.producerRepository.findAll();
  }
}
