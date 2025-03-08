import { Test, TestingModule } from '@nestjs/testing';
import { FindAllProducerUseCase } from '../../../src/application/use-cases/producers/find-all.usecase';
import { IProducerRepository } from '../../../src/domain/interfaces/producers.repository.interface';
import { FindAllProducerResponseDto } from '../../../src/application/use-cases/producers/dto/response/findAll-reponse.dto';
import { FindAllProducerQueryRequestDto } from '../../../src/application/use-cases/producers/dto/request/findAll-request.dto';

describe('FindAllProducerUseCase', () => {
  let findAllProducerUseCase: FindAllProducerUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllProducerUseCase,
        {
          provide: IProducerRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllProducerUseCase = module.get<FindAllProducerUseCase>(
      FindAllProducerUseCase,
    );
    producerRepository = module.get<IProducerRepository>(IProducerRepository);
  });

  it('should be defined', () => {
    expect(findAllProducerUseCase).toBeDefined();
  });

  it('should call producerRepository.findAll and return the result', async () => {
    const producers: FindAllProducerResponseDto = {
      producers: [],
      total: 10
    }
    const input: FindAllProducerQueryRequestDto = {
      skip: 1,
      take: 10
    }
    jest.spyOn(producerRepository, 'findAll').mockResolvedValue(producers);

    const result = await findAllProducerUseCase.execute(input);

    expect(producerRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(producers);
  });
});
