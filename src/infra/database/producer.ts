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
import { FindAllProducerQueryRequestDto } from '@app/use-cases/producers/dto/request/findAll-request.dto';
import { NotFoundException } from '@nestjs/common';

export class ProducerImplementation implements IProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(
    payload: CreateProducerRequestDto,
  ): Promise<CreateProducerResponseDto> {
    const producer = this.producerRepository.create(payload);
    return this.producerRepository.save(producer);
  }

  async findProducerByDocument(
    document: string,
  ): Promise<FindOneProducerResponseDto> {
    const producer = await this.producerRepository
      .createQueryBuilder('producer')
      .leftJoinAndSelect('producer.farms', 'farms')
      .where('producer.document = :document', { document })
      .getOne();

    return producer;
  }

  async findProducerById(id: string): Promise<FindOneProducerResponseDto> {
    const producer = await this.producerRepository
      .createQueryBuilder('producer')
      .leftJoinAndSelect('producer.farms', 'farms')
      .where('producer.id = :id', { id })
      .getOne();

    return producer;
  }

  async findAll(
    input: FindAllProducerQueryRequestDto = { take: 10, skip: 0 },
  ): Promise<FindAllProducerResponseDto> {
    const { take, skip } = input;

    const [producers, total] = await this.producerRepository
      .createQueryBuilder('producer')
      .leftJoinAndSelect('producer.farms', 'farms')
      .leftJoinAndSelect('farms.seasons', 'seasons')
      .leftJoinAndSelect('seasons.crops', 'crops')
      .leftJoinAndSelect('crops.harvests', 'harvests')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return {
      producers,
      total,
    };
  }

  async delete(id: string): Promise<void> {
    const result = await this.producerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
  }

  async update(
    payload: UpdateProducerRequestDto,
  ): Promise<UpdateProducerResponseDto> {
    const { id } = payload;
    const result = await this.producerRepository.update(id, payload);
    if (result.affected === 0) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }

    const updatedProducer = await this.producerRepository
      .createQueryBuilder('producer')
      .leftJoinAndSelect('producer.farms', 'farms')
      .where('producer.id = :id', { id })
      .getOne();

    return updatedProducer;
  }
}