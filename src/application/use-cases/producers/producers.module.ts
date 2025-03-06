import { Module } from '@nestjs/common';
import { ProducersController } from '@presentation/controllers/producers/producers.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateProducerUseCase } from './create-producer.usecase';
import { FindAllProducerUseCase } from './find-all.usecase';
import { FindByDocumentUseCase } from './find-by-document.usecase';
import { FindByIdUseCase } from './find-by-id.usecase';
import { UpdateProducerUseCase } from './update-producer.usecase';
import { DeleteProducerUseCase } from './delete-producer.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateProducerUseCase,
    FindAllProducerUseCase,
    FindByDocumentUseCase,
    FindByIdUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase
  ],
  exports: [
    CreateProducerUseCase,
    FindAllProducerUseCase,
    FindByDocumentUseCase,
    FindByIdUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase
  ],
  controllers: [ProducersController],
})
export class ProducersModule {}
