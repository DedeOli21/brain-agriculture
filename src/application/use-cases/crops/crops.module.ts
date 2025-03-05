import { Module } from '@nestjs/common';
import { CreateCropUseCase } from './create-crops.usecase';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateCropUseCase],
  exports: [CreateCropUseCase],
})
export class CropsModule {}
