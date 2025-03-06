import { IProducerRepository } from "@domain/interfaces/producers.repository.interface";
import { BadRequestException, Injectable } from "@nestjs/common";
import { isValidDocument } from "@shared/helpers/is-valid-document";

@Injectable()
export class DeleteProducerUseCase {
    constructor(private readonly producerRepository: IProducerRepository) {}

    async execute(id: string): Promise<void> {
        const producer = this.producerRepository.findProducerById(id);

        if (!producer) {
            throw new Error('Producer does not exist');
        }

        return await this.producerRepository.delete(id);

    }
}