import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './crop.entity';
import { Season } from '../season/season.entity';
import { CropsController } from './crops.controller';
// import { CropRepository } from './repositories/crop.repository';
import { CreateCropUseCase } from './crops.service';
import { SeasonRepository } from '../season/season.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Season])],
  controllers: [CropsController],
  providers: [SeasonRepository, CreateCropUseCase],
  exports: [CreateCropUseCase],
})
export class CropsModule {}
