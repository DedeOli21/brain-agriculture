import { Module } from '@nestjs/common';
import { CreateSeasonUseCase } from './create-season.usecase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateSeasonUseCase],
  exports: [CreateSeasonUseCase],
})
export class SeasonModule {}
