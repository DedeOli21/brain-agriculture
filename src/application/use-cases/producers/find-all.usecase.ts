import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';

@Injectable()
export class FindAllProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute() {
    return await this.producerRepository.findAll();
  }
}
