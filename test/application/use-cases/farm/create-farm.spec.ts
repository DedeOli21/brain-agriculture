import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateFarmUseCase } from '@app/use-cases/farms/create-farm.usecase';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { IProducerRepository } from '@domain/interfaces/producers.repository.interface';
import { Farm } from '@domain/entities/farms/farm.entity';
import { CreateFarmRequestDto } from '@app/use-cases/farms/dto/request/create-request.dto';
import { Producer } from '@domain/entities/producers/producer.entity';

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
      state: 'sp'
    };

    await expect(createFarmUseCase.execute(payload)).rejects.toThrow(BadRequestException);
  });

  it('should call findProducerById on producerRepository with correct producer ID', async () => {
    const payload: CreateFarmRequestDto = {
      producerId: '123',
      totalArea: 100,
      arableArea: 40,
      vegetationArea: 50,
      name: '',
      city: '',
      state: ''
    };

    jest.spyOn(producerRepository, 'findProducerById').mockResolvedValue({ id: '123', name: 'Test Producer' });

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
      state: ''
    };

    const producer: Producer = {
      id: '123', name: 'Test Producer',
      document: '',
      farms: []
    };
    jest.spyOn(producerRepository, 'findProducerById').mockResolvedValue(producer);

    const farm: Farm = {
      id: '456',
      producer,
      totalArea: 100,
      arableArea: 40,
      vegetationArea: 50,
      name: '',
      city: '',
      state: '',
      seasons: []
    };

    jest.spyOn(farmRepository, 'create').mockResolvedValue(farm);

    const result = await createFarmUseCase.execute(payload);
    expect(farmRepository.create).toHaveBeenCalledWith({ ...payload, producer });
    expect(result).toEqual(farm);
  });
});