import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FarmsService],
  exports: [FarmsService],
  controllers: [FarmsController],
})
export class FarmsModule {}
