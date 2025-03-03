import { BadRequestException, Injectable } from '@nestjs/common';
import { isValidDocumentToProducer } from '../../shared/helpers/is-valid-document-to-producer';
import { IProducerRepository } from 'src/application/producers.interface';
import { CreateProducerRequestDto } from './dto/request/create-request.dto';

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

        const producer = this.producerRepository.findProducerByDocument(payload.document);

        if (producer) {
            throw new Error('Producer already exists');
        }

        return await this.producerRepository.create(payload);
    }
}
