import { BadRequestException, Injectable } from '@nestjs/common';
import { IProducerRepository } from 'src/domain/interfaces/producers.repository.interface';
import { isValidDocumentToProducer } from 'src/shared/helpers/is-valid-document-to-producer';

@Injectable()
export class FindByDocumentUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(document: string) {
    const isValidDocument = isValidDocumentToProducer(document);

    if (!isValidDocument) {
      throw new BadRequestException(`Document ${document} is not valid`);
    }

    return await this.producerRepository.findProducerByDocument(document);
  }
}
