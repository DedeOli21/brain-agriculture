import { BadRequestException, Injectable } from '@nestjs/common';
import { IProducerRepository } from 'src/domain/interfaces/producers.repository.interface';
import { CreateProducerRequestDto } from 'src/application/use-cases/producers/dto/request/create-request.dto';
import { isValidDocumentToProducer } from 'src/shared/helpers/is-valid-document-to-producer';

@Injectable()
export class CreateProducerUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(payload: CreateProducerRequestDto): Promise<any> {
    const { document } = payload;

    if (!document) {
      throw new Error('Document is required');
    }

    const isValidDocument = isValidDocumentToProducer(document);

    if (!isValidDocument) {
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
