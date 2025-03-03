import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Producer } from "src/domain/producers/producer.entity";
import { IProducerRepository } from "src/application/producers.interface";
import { ProducerImplementation } from "./producer";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  providers: [
    { provide: IProducerRepository, useClass: ProducerImplementation },
  ],
  exports: [IProducerRepository],
})
export class DatabaseModule {}