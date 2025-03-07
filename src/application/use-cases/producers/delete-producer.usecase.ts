import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteProducerResponseDto } from './dto/response/delete-response.dto';

@Injectable()
export class DeleteProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(id: string): Promise<DeleteProducerResponseDto> {
    const producer = this.producerRepository.findProducerById(id);

    if (!producer) {
      throw new BadRequestException('Producer does not exist');
    }

    this.producerRepository.delete(id);

    return {
      message: 'Producer successfully deleted',
      status: HttpStatus.OK,
    };
  }
}
