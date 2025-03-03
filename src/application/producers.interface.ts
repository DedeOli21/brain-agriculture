import { CreateProducerRequestDto } from 'src/domain/producers/dto/request/create-request.dto';

export abstract class IProducerRepository {
  findProducerByDocument: (document: string) => Promise<any>;
  create: (payload: CreateProducerRequestDto) => any;
  findProducerById: (id: string) => Promise<any>;
  findAll: () => Promise<any>;
}
