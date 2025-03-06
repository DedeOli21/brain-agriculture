import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Producer } from '@domain/entities/producers/producer.entity';
import { CreateProducerUseCase } from '@app/use-cases/producers/create-producer.usecase';
import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';
import { FindAllProducerUseCase } from '@app/use-cases/producers/find-all.usecase';
import { FindByIdUseCase } from '@app/use-cases/producers/find-by-id.usecase';
import { FindByDocumentUseCase } from '@app/use-cases/producers/find-by-document.usecase';
import { UpdateProducerUseCase } from '@app/use-cases/producers/update-producer.usecase';
import { UpdateProducerRequestDto } from '@app/use-cases/producers/dto/request/update-request.dto';
import { UpdateProducerResponseDto } from '@app/use-cases/producers/dto/response/update-response.dto';
import { DeleteProducerUseCase } from '@app/use-cases/producers/delete-producer.usecase';

@Controller('producers')
export class ProducersController {
  constructor(
    private readonly createProducerUsecase: CreateProducerUseCase,
    private readonly findAllProducerUseCase: FindAllProducerUseCase,
    private readonly findByIdProducerUSeCase: FindByIdUseCase,
    private readonly findByDocumentProducerUseCase: FindByDocumentUseCase,
    private readonly updateProducerUsecase: UpdateProducerUseCase,
    private readonly deleteProducerUsecase: DeleteProducerUseCase,

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
    return this.findByIdProducerUSeCase.execute(id);
  }

  @Put('update')
  updateProducer(
    @Body() payload: UpdateProducerRequestDto,
  ): Promise<UpdateProducerResponseDto> {
    return this.updateProducerUsecase.execute(payload);
  }

  @Delete(':id')
  deleteProducer(@Param('id') id: string): Promise<void> {
    return this.deleteProducerUsecase.execute(id);
  }
}
