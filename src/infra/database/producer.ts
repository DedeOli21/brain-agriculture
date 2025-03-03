import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IProducerRepository } from "src/application/producers.interface";
import { Producer } from "src/domain/producers/producer.entity";
import { Repository } from "typeorm";

export class ProducerImplementation implements IProducerRepository {
    constructor(
        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ) {}

    
    findProducerByDocument(document: string): any {
        return this.producerRepository.findOneBy({ document})
    }

    create(payload: any): any {
        return this.producerRepository.save(payload);
    }
}