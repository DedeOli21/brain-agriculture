import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Producer } from './producer.entity';
import { ProducersService } from './producers.service';
import { CreateProducerRequestDto } from './dto/request/create-request.dto';

@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  create(@Body() payload: CreateProducerRequestDto): Promise<Producer> {
    return this.producersService.create(payload);
  }

  @Get()
  findAll(): Promise<Producer[]> {
    return this.producersService.findAll();
  }

  @Get(':document')
  findProducerByDocument(
    @Param('document') document: string,
  ): Promise<Producer> {
    return this.producersService.findProducerByDocument(document);
  }

  @Get('/by-id/:id')
  findProducerById(@Param('id') id: string): Promise<Producer> {
    console.log('id', id);
    return this.producersService.findProducerById(id);
  }
}
