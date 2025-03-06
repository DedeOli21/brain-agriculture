import { InjectRepository } from '@nestjs/typeorm';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { Producer } from '@domain/entities/producers/producer.entity';
import { Repository } from 'typeorm';
import { UpdateProducerRequestDto } from '@app/use-cases/producers/dto/request/update-request.dto';
import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';
import { CreateProducerResponseDto } from '@app/use-cases/producers/dto/response/create-response.dto';
import { UpdateProducerResponseDto } from '@app/use-cases/producers/dto/response/update-response.dto';
import { FindOneProducerResponseDto } from '@app/use-cases/producers/dto/response/findOne-reponse.dto';
import { FindAllProducerResponseDto } from '@app/use-cases/producers/dto/response/findAll-reponse.dto';

export class ProducerImplementation implements IProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  create(payload: CreateProducerRequestDto): Promise<CreateProducerResponseDto> {
    return this.producerRepository.save(payload);
  }

  findProducerByDocument(document: string): Promise<FindOneProducerResponseDto> {
    return this.producerRepository.findOne({
      where: { document },
      relations: ['farms'],
    });
  }

  findProducerById(id: string): Promise<FindOneProducerResponseDto> { 
    return this.producerRepository.findOne({
      where: { id },
      relations: ['farms'],
    });
  }

  findAll(): Promise<FindAllProducerResponseDto[]> {
    return this.producerRepository.find({
      relations: [
        'farms',
        'farms.seasons',
        'farms.seasons.crops',
        'farms.seasons.crops.harvests',
      ],
    });
  }

  delete(id: string): void {
    this.producerRepository.delete(id);
  }

  async update(payload: UpdateProducerRequestDto): Promise<UpdateProducerResponseDto> {
    const { id } = payload;
    await this.producerRepository.update(id, payload);
    return this.producerRepository.findOne({ where: { id } });
  }
}
