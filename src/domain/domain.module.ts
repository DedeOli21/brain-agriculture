import { Module } from "@nestjs/common";
import { ProducersModule } from "./producers/producers.module";

const usecases = [ProducersModule];

@Module({
  imports: usecases,
  exports: usecases,
})
export class DomainModule {}
