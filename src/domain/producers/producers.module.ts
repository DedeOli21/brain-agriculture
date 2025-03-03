import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProducersService],
  exports: [ProducersService],
  controllers: [ProducersController],
})

export class ProducersModule {}
