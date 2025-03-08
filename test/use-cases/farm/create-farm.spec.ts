import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateFarmUseCase } from '../../../src/application/use-cases/farms/create-farm.usecase';
import { IFarmRepository } from '../../../src/domain/interfaces/farms.repository.interface';
import { IProducerRepository } from '../../../src/domain/interfaces/producers.repository.interface';
import { Farm } from '../../../src/domain/entities/farms/farm.entity';
import { CreateFarmRequestDto } from '../../../src/application/use-cases/farms/dto/request/create-request.dto';
import { Producer } from '../../../src/domain/entities/producers/producer.entity';

describe('CreateFarmUseCase', () => {
  let createFarmUseCase: CreateFarmUseCase;
  let farmRepository: IFarmRepository;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFarmUseCase,
        {
          provide: IFarmRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: IProducerRepository,
          useValue: {
            findProducerById: jest.fn(),
          },
        },
      ],
    }).compile();

    createFarmUseCase = module.get<CreateFarmUseCase>(CreateFarmUseCase);
    farmRepository = module.get<IFarmRepository>(IFarmRepository);
    producerRepository = module.get<IProducerRepository>(IProducerRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createFarmUseCase).toBeDefined();
  });

  it('should throw BadRequestException if area is invalid', async () => {
    const payload: CreateFarmRequestDto = {
      producerId: '123',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 50,
      name: 'farm',
      city: 'city-city',
      state: 'sp',
    };

    await expect(createFarmUseCase.execute(payload)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should call findProducerById on producerRepository with correct producer ID', async () => {
    const payload: CreateFarmRequestDto = {
      producerId: '123',
      totalArea: 100,
      arableArea: 40,
      vegetationArea: 50,
      name: '',
      city: '',
      state: '',
    };

    jest
      .spyOn(producerRepository, 'findProducerById')
      .mockResolvedValue({ id: '123', name: 'Test Producer' } as any);

    await createFarmUseCase.execute(payload);
    expect(producerRepository.findProducerById).toHaveBeenCalledWith('123');
  });

  it('should call create on farmRepository with correct data', async () => {
    const payload: CreateFarmRequestDto = {
      producerId: '123',
      totalArea: 100,
      arableArea: 40,
      vegetationArea: 50,
      name: '',
      city: '',
      state: '',
    };

    const producer: Producer = {
      id: '123',
      name: 'Test Producer',
      document: '',
      farms: [],
    };
    jest
      .spyOn(producerRepository, 'findProducerById')
      .mockResolvedValue(producer);

    const farm: Farm = {
      id: '456',
      producerId: {
        id: '123',
        name: 'Test Producer',
        document: '',
        farms: [],
      },
      total_area: 100,
      arable_area: 40,
      vegetation_area: 50,
      name: '',
      city: '',
      state: '',
      seasons: [],
    };

    jest.spyOn(farmRepository, 'create').mockResolvedValue(farm);

    const result = await createFarmUseCase.execute(payload);
    expect(farmRepository.create).toHaveBeenCalledWith({
      ...payload,
      producerId: producer.id,
    });
    expect(result).toEqual(farm);
  });

  it('should throw NotFoundException if producer is not found', async () => {
    const payload: CreateFarmRequestDto = {
      producerId: '123',
      totalArea: 100,
      arableArea: 40,
      vegetationArea: 50,
      name: '',
      city: '',
      state: '',
    };

    jest.spyOn(producerRepository, 'findProducerById').mockResolvedValue(null);

    await expect(createFarmUseCase.execute(payload)).rejects.toThrow(
      NotFoundException,
    );
  });
});
