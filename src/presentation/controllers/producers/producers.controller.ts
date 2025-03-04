import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Producer } from '../../../domain/entities/producers/producer.entity';
import { CreateProducerUseCase } from '../../../application/use-cases/producers/create-producer.usecase';
import { CreateProducerRequestDto } from '../../../application/use-cases/producers/dto/request/create-request.dto';
import { FindAllProducerUseCase } from 'src/application/use-cases/producers/find-all.usecase';
import { FindByIdUseCase } from 'src/application/use-cases/producers/find-by-id.usecase';
import { FindByDocumentUseCase } from 'src/application/use-cases/producers/find-by-document.usecase';

@Controller('producers')
export class ProducersController {
  constructor(
    private readonly createProducerUsecase: CreateProducerUseCase,
    private readonly findAllProducerUseCase: FindAllProducerUseCase,
    private readonly findByIdProducerUSeCase: FindByIdUseCase,
    private readonly findByDocumentProducerUseCase: FindByDocumentUseCase,
  ) {}

  @Post()
  create(@Body() payload: CreateProducerRequestDto): Promise<Producer> {
    return this.createProducerUsecase.execute(payload);
  }

  @Get()
  findAll(): Promise<Producer[]> {
    return this.findAllProducerUseCase.execute();
  }

  @Get(':document')
  findProducerByDocument(
    @Param('document') document: string,
  ): Promise<Producer> {
    return this.findByDocumentProducerUseCase.execute(document);
  }

  @Get('/by-id/:id')
  findProducerById(@Param('id') id: string): Promise<Producer> {
    console.log('id', id);
    return this.findByIdProducerUSeCase.execute(id);
  }
}
