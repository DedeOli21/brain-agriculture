import { Body, Controller, Post } from '@nestjs/common';
import { Producer } from './producer.entity';
import { ProducersService } from './producers.service';

@Controller('producers')
export class ProducersController {
    constructor(private readonly producersService: ProducersService) {}

    @Post()
    create(@Body() payload: Producer) {
        return this.producersService.create(payload);
    }
}
