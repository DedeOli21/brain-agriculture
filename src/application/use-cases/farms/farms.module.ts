import { Module } from '@nestjs/common';
import { CreateFarmUseCase } from './create-farm.usecase';
import { FindAllFarmUseCase } from './findAll-farm.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateFarmUseCase, FindAllFarmUseCase],
  exports: [CreateFarmUseCase, FindAllFarmUseCase],
})
export class FarmsModule {}
