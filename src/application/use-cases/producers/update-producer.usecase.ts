import { IProducerRepository } from "@domain/interfaces/producers.repository.interface";
import { BadRequestException, Injectable } from "@nestjs/common";
import { isValidDocument } from "@shared/helpers/is-valid-document";
import { UpdateProducerRequestDto } from "./dto/request/update-request.dto";
import { UpdateProducerResponseDto } from "./dto/response/update-response.dto";

@Injectable()
export class UpdateProducerUseCase {
    constructor(private readonly producerRepository: IProducerRepository) {}

    async execute(payload: UpdateProducerRequestDto): Promise<UpdateProducerResponseDto> {
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

        if (!producer) {
            throw new Error('Producer does not exist');
        }

        return await this.producerRepository.update(payload);
    }
}