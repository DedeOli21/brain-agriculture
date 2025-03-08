import { IFarmRepository } from '../../../src/domain/interfaces/farms.repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllFarmUseCase } from '../../../src/application/use-cases/farms/findAll-farm.usecase';
import { FindAllFarmQueryRequestDto } from '../../../src/application/use-cases/farms/dto/request/findAll-request.dto';
import { FindAllFarmResponseDto } from '../../../src/application/use-cases/farms/dto/response/findAll-response.dto';

describe('FindAllFarmUseCase', () => {
  let findAllFarmUseCase: FindAllFarmUseCase;
  let farmRepository: IFarmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllFarmUseCase,
        {
          provide: IFarmRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllFarmUseCase = module.get<FindAllFarmUseCase>(FindAllFarmUseCase);
    farmRepository = module.get<IFarmRepository>(IFarmRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findAllFarmUseCase).toBeDefined();
  });

  it('should call findAll on farmRepository with correct query', async () => {
    const query: FindAllFarmQueryRequestDto = {
      farmId: '123',
      take: 10,
      skip: 1,
    };
    const response: FindAllFarmResponseDto = { count: 2, data: [] };

    jest.spyOn(farmRepository, 'findAll').mockResolvedValue(response);

    const result = await findAllFarmUseCase.execute(query);
    expect(farmRepository.findAll).toHaveBeenCalledWith(query);
    expect(result).toEqual(response);
  });

  it('should throw an error if farmRepository.findAll fails', async () => {
    const query: FindAllFarmQueryRequestDto = { skip: 1, take: 10 };

    jest
      .spyOn(farmRepository, 'findAll')
      .mockRejectedValue(new Error('Failed to fetch farms'));

    await expect(findAllFarmUseCase.execute(query)).rejects.toThrow(
      'Failed to fetch farms',
    );
  });
});
