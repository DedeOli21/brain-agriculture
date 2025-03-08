import { CreateHarvestUseCase } from '../../../src/application/use-cases/harvest/create-harvest.usecase';
import { CreateHarvestDto } from '../../../src/application/use-cases/harvest/dto/create-harvest.dto';
import { Crop } from '../../../src/domain/entities/crops/crop.entity';
import { Harvest } from '../../../src/domain/entities/harvest/harvest.entity';
import { ICropRepository } from '../../../src/domain/interfaces/crop.repository.interface';
import { IHarvestRepository } from '../../../src/domain/interfaces/harvest.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateHarvestUseCase', () => {
  let createHarvestUseCase: CreateHarvestUseCase;
  let harvestRepository: IHarvestRepository;
  let cropRepository: ICropRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHarvestUseCase,
        {
          provide: IHarvestRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ICropRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    createHarvestUseCase =
      module.get<CreateHarvestUseCase>(CreateHarvestUseCase);
    harvestRepository = module.get<IHarvestRepository>(IHarvestRepository);
    cropRepository = module.get<ICropRepository>(ICropRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createHarvestUseCase).toBeDefined();
  });

  it('should call findById on cropRepository with correct crop ID', async () => {
    const data: CreateHarvestDto = {
      cropId: '123',
      amount: 100,
      harvestDate: new Date(),
    };

    jest
      .spyOn(cropRepository, 'findById')
      .mockResolvedValue({ id: '123', name: 'Wheat' } as Crop);
    await createHarvestUseCase.execute(data);
    expect(cropRepository.findById).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException if crop is not found', async () => {
    const data: CreateHarvestDto = {
      cropId: '123',
      amount: 100,
      harvestDate: new Date(),
    };
    jest.spyOn(cropRepository, 'findById').mockResolvedValue(null);

    await expect(createHarvestUseCase.execute(data)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call create on harvestRepository with correct data', async () => {
    const data: CreateHarvestDto = {
      cropId: '123',
      amount: 100,
      harvestDate: new Date(),
    };
    const crop: Crop = { id: '123', name: 'Wheat' } as Crop;
    const harvest: Harvest = {
      id: '456',
      amount: 100,
      harvestDate: new Date(),
      crop,
    } as Harvest;

    jest.spyOn(cropRepository, 'findById').mockResolvedValue(crop);
    jest.spyOn(harvestRepository, 'create').mockResolvedValue(harvest);

    const result = await createHarvestUseCase.execute(data);
    expect(harvestRepository.create).toHaveBeenCalledWith({
      amount: data.amount,
      harvestDate: data.harvestDate,
      crop,
    });
    expect(result).toEqual(harvest);
  });

  it('should throw NotFoundException if crop does not exist', async () => {
    const data: CreateHarvestDto = {
      cropId: '123',
      amount: 100,
      harvestDate: new Date(),
    };

    jest.spyOn(cropRepository, 'findById').mockResolvedValue(undefined);

    await expect(createHarvestUseCase.execute(data)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call create on harvestRepository with correct data', async () => {
    const data: CreateHarvestDto = {
      cropId: '123',
      amount: 100,
      harvestDate: new Date(),
    };
    const crop: Crop = { id: '123', name: 'Wheat' } as Crop;
    const harvest: Harvest = {
      id: '456',
      amount: 100,
      harvestDate: new Date(),
      crop,
    } as Harvest;

    jest.spyOn(cropRepository, 'findById').mockResolvedValue(crop);
    jest.spyOn(harvestRepository, 'create').mockResolvedValue(harvest);

    const result = await createHarvestUseCase.execute(data);

    expect(harvestRepository.create).toHaveBeenCalledWith({
      amount: data.amount,
      harvestDate: data.harvestDate,
      crop,
    });

    expect(result).toEqual(harvest);
  });
});
