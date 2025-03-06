import { CreateProducerRequestDto } from '@app/use-cases/producers/dto/request/create-request.dto';
import { UpdateProducerRequestDto } from '@app/use-cases/producers/dto/request/update-request.dto';
import { CreateProducerResponseDto } from '@app/use-cases/producers/dto/response/create-response.dto';
import { FindAllProducerResponseDto } from '@app/use-cases/producers/dto/response/findAll-reponse.dto';
import { FindOneProducerResponseDto } from '@app/use-cases/producers/dto/response/findOne-reponse.dto';
import { UpdateProducerResponseDto } from '@app/use-cases/producers/dto/response/update-response.dto';

export abstract class IProducerRepository {
  findProducerByDocument: (
    document: string,
  ) => Promise<FindOneProducerResponseDto>;
  create: (payload: CreateProducerRequestDto) => Promise<CreateProducerResponseDto>;
  findProducerById: (id: string) => Promise<FindOneProducerResponseDto>;
  findAll: () => Promise<FindAllProducerResponseDto[]>;
  delete: (id: string) => void;
  update: (payload: UpdateProducerRequestDto) => Promise<UpdateProducerResponseDto>;
}
