import { Module } from '@nestjs/common';
import { CreateHarvestUseCase } from './create-harvest.usecase';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateHarvestUseCase],
  exports: [CreateHarvestUseCase],
})
export class HarvestModule {}
