import { Test, TestingModule } from '@nestjs/testing';
import { FindAllProducerUseCase } from '@app/use-cases/producers/find-all.usecase';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { FindAllProducerResponseDto } from '@app/use-cases/producers/dto/response/findAll-reponse.dto';

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
    const producers: FindAllProducerResponseDto[] = [
      {
        id: '1',
        name: 'Producer 1',
        document: '123456789',
        farms: [],
      },
      {
        id: '2',
        name: 'Producer 2',
        document: '987654321',
        farms: [],
      },
    ];
    jest.spyOn(producerRepository, 'findAll').mockResolvedValue(producers);

    const result = await findAllProducerUseCase.execute();

    expect(producerRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(producers);
  });
});
