import { BadRequestException, Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';
import { isValidDocument } from '@shared/helpers/is-valid-document';

@Injectable()
export class CreateProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(payload: CreateProducerRequestDto): Promise<any> {
    const { document } = payload;

    if (!document) {
      throw new Error('Document is required');
    }

    const isValiDoc = isValidDocument(document);

    if (!isValiDoc) {
      throw new BadRequestException(`Document ${document} is not valid`);
    }

    const producer = await this.producerRepository.findProducerByDocument(
      payload.document,
    );

    if (producer) {
      throw new Error('Producer already exists');
    }

    return await this.producerRepository.create(payload);
  }
}
