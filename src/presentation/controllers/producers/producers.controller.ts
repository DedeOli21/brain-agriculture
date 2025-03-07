import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProducerResponseDto } from '@app/use-cases/producers/dto/response/create-response.dto';
import { FindAllProducerResponseDto } from '@app/use-cases/producers/dto/response/findAll-reponse.dto';
import { DeleteProducerResponseDto } from '@app/use-cases/producers/dto/response/delete-response.dto';
import { FindAllProducerQueryRequestDto } from '@app/use-cases/producers/dto/request/findAll-request.dto';

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
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The producer has been successfully created.',
    type: CreateProducerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Document already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid document',
  })
  create(
    @Body() payload: CreateProducerRequestDto,
  ): Promise<CreateProducerResponseDto> {
    return this.createProducerUsecase.execute(payload);
  }

  @Get()
  @ApiOperation({ summary: 'List all producers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of producers',
    type: FindAllProducerResponseDto,
    isArray: true,
  })
  findAll(
    @Query() input: FindAllProducerQueryRequestDto,
  ): Promise<FindAllProducerResponseDto> {
    return this.findAllProducerUseCase.execute(input);
  }

  @Get(':document')
  @ApiOperation({ summary: 'Find a producer by document' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producer found',
    type: Producer,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producer not found',
  })
  findProducerByDocument(
    @Param('document') document: string,
  ): Promise<Producer> {
    return this.findByDocumentProducerUseCase.execute(document);
  }

  @Get('/by-id/:id')
  @ApiOperation({ summary: 'Find a producer by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producer found',
    type: FindAllProducerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producer not found',
  })
  findProducerById(@Param('id') id: string): Promise<Producer> {
    return this.findByIdProducerUSeCase.execute(id);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update a producer' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'producer updated successfully',
    type: UpdateProducerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producer not found',
  })
  @ApiParam({ name: 'id', description: 'Iproducer ID', type: String })
  updateProducer(
    @Body() payload: UpdateProducerRequestDto,
  ): Promise<UpdateProducerResponseDto> {
    return this.updateProducerUsecase.execute(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a producer' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producer deleted successfully',
    type: DeleteProducerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producer not found',
  })
  @ApiParam({ name: 'id', description: 'Producer ID', type: String })
  deleteProducer(@Param('id') id: string): Promise<DeleteProducerResponseDto> {
    return this.deleteProducerUsecase.execute(id);
  }
}
