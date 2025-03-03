import { BadRequestException, Injectable } from '@nestjs/common';
import { isValidDocumentToProducer } from '../../shared/helpers/is-valid-document-to-producer';
import { IProducerRepository } from 'src/application/interfaces/producers.repository.interface';
import { CreateProducerRequestDto } from './dto/request/create-request.dto';
import { FindOneProducerResponseDto } from './dto/response/findOne-reponse.dto';

@Injectable()
export class ProducersService {
  constructor(private readonly producerRepository: IProducerRepository) {}

  async create(payload: CreateProducerRequestDto): Promise<any> {
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

  async findProducerByDocument(document: string): Promise<any> {
    console.log('document', document);
    const isValidDocument = isValidDocumentToProducer(document);

    if (!isValidDocument) {
      throw new BadRequestException(`Document ${document} is not valid`);
    }

    return await this.producerRepository.findProducerByDocument(document);
  }

  async findProducerById(id: string): Promise<FindOneProducerResponseDto> {
    return await this.producerRepository.findProducerById(id);
  }

  async findAll(): Promise<any> {
    return await this.producerRepository.findAll();
  }
}
