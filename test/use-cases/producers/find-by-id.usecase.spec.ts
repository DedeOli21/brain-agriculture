import { Test, TestingModule } from '@nestjs/testing';
import { FindByIdUseCase } from '../../../src/application/use-cases/producers/find-by-id.usecase';
import { IProducerRepository } from '../../../src/domain/interfaces/producers.repository.interface';
import { FindOneProducerResponseDto } from '../../../src/application/use-cases/producers/dto/response/findOne-reponse.dto';
import { BadRequestException } from '@nestjs/common';

describe('FindByIdUseCase', () => {
  let findByIdUseCase: FindByIdUseCase;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByIdUseCase,
        {
          provide: IProducerRepository,
          useValue: {
            findProducerById: jest.fn().mockResolvedValue({} as FindOneProducerResponseDto),
          },
        },
      ],
    }).compile();

    findByIdUseCase = module.get<FindByIdUseCase>(FindByIdUseCase);
    producerRepository = module.get<IProducerRepository>(IProducerRepository);
  });

  it('should be defined', () => {
    expect(findByIdUseCase).toBeDefined();
  });

  it('should call findProducerById with correct id', async () => {
    const id = '123';
    await findByIdUseCase.execute(id);
    expect(producerRepository.findProducerById).toHaveBeenCalledWith(id);
  });

  it('should return the producer when found', async () => {
    const id = '123';
    const producer = { id, name: 'Test Producer' };
    jest
      .spyOn(producerRepository, 'findProducerById')
      .mockResolvedValue(producer as FindOneProducerResponseDto);

    const result = await findByIdUseCase.execute(id);
    expect(result).toEqual(producer);
  });

  it('should return null when producer is not found', async () => {
    const id = '123';
    jest.spyOn(producerRepository, 'findProducerById').mockResolvedValue(null);

    await expect(findByIdUseCase.execute(id)).rejects.toThrow(BadRequestException);
  });
});
