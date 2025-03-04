import { InjectRepository } from '@nestjs/typeorm';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { Producer } from '@domain/entities/producers/producer.entity';
import { Repository } from 'typeorm';

export class ProducerImplementation implements IProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  create(payload: any): any {
    return this.producerRepository.save(payload);
  }

  findProducerByDocument(document: string): any {
    return this.producerRepository.findOne({
      where: { document },
      relations: ['farms'],
    });
  }

  findProducerById(id: string): any {
    return this.producerRepository.findOne({
      where: { id },
      relations: ['farms'],
    });
  }

  findAll(): any {
    return this.producerRepository.find({
      relations: [
        'farms',
        'farms.seasons',
        'farms.seasons.crops',
        'farms.seasons.crops.harvests',
      ],
    });
  }
}
