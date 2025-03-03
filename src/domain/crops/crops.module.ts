import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './crop.entity';
// import { CropController } from './crop.controller';
import { CropsService } from './crops.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  controllers: [],
  providers: [CropsService],
  exports: [CropsService],
})
export class CropsModule {}
