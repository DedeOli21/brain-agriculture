import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './season.entity';
import { Farm } from '../farms/farm.entity';
import { SeasonController } from './season.controller';
import { CreateSeasonUseCase } from './createSeason.useCase';
import { SeasonRepository } from './season.repository';
import { FarmImplementation } from 'src/infra/database/farm';

@Module({
  imports: [TypeOrmModule.forFeature([Season, Farm])],
  controllers: [SeasonController],
  providers: [SeasonRepository, FarmImplementation, CreateSeasonUseCase],
})
export class SeasonModule {}
