import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(id: string) {
    return await this.producerRepository.findProducerById(id);
  }
}
