import { BadRequestException, Injectable } from '@nestjs/common';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { isValidDocument } from '@shared/helpers/is-valid-document';

@Injectable()
export class FindByDocumentUseCase {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async execute(document: string) {
    const isValidDoc = isValidDocument(document);

    if (!isValidDoc) {
      throw new BadRequestException(`Document ${document} is not valid`);
    }

    return await this.producerRepository.findProducerByDocument(document);
  }
}
