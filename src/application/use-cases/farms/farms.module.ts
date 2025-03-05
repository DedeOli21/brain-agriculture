import { Module } from '@nestjs/common';
import { CreateFarmUseCase } from '@app/use-cases/farms/create-farm.usecase';
import { FindAllFarmUseCase } from '@app/use-cases/farms/findAll-farm.usecase';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateFarmUseCase, FindAllFarmUseCase],
  exports: [CreateFarmUseCase, FindAllFarmUseCase],
})
export class FarmsModule {}
