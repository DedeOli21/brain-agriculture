import { CreateCropUseCase } from '@app/use-cases/crops/create-crops.usecase';
import { CreateCropDto } from '@app/use-cases/crops/dtos/create-crop.dto';
import { Crop } from '@domain/entities/crops/crop.entity';
import { Farm } from '@domain/entities/farms/farm.entity';
import { Season } from '@domain/entities/season/season.entity';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { ISeasonRepository } from '@domain/interfaces/season.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateCropUseCase', () => {
  let createCropUseCase: CreateCropUseCase;
  let cropRepository: ICropRepository;
  let seasonRepository: ISeasonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCropUseCase,
        {
          provide: ICropRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ISeasonRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    createCropUseCase = module.get<CreateCropUseCase>(CreateCropUseCase);
    cropRepository = module.get<ICropRepository>(ICropRepository);
    seasonRepository = module.get<ISeasonRepository>(ISeasonRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createCropUseCase).toBeDefined();
  });

  it('should call findById on seasonRepository with correct season ID', async () => {
    const data: CreateCropDto = { name: 'Wheat', seasonId: '123' };

    jest.spyOn(seasonRepository, 'findById').mockResolvedValue({
      id: '123',
      name: 'Spring',
      year: '',
      farm: new Farm(),
      crops: [],
    });
    await createCropUseCase.execute(data);
    expect(seasonRepository.findById).toHaveBeenCalledWith({
      id: data.seasonId,
    });
  });

  it('should throw NotFoundException if season is not found', async () => {
    const data: CreateCropDto = { name: 'Wheat', seasonId: '123' };
    jest.spyOn(seasonRepository, 'findById').mockResolvedValue(null);

    await expect(createCropUseCase.execute(data)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call create on cropRepository with correct data', async () => {
    const data: CreateCropDto = { name: 'Wheat', seasonId: '123' };
    const dataMockCrop: Crop = {
      name: 'Wheat',
      season: {
        id: '123',
        name: 'Spring',
        year: '',
        farm: new Farm(),
        crops: [],
      },
      harvests: [],
      id: '',
      createdAt: '',
      updatedAt: '',
    };
    const season: Season = {
      id: '123',
      name: 'Spring',
      year: '',
      farm: new Farm(),
      crops: [],
    };

    jest.spyOn(seasonRepository, 'findById').mockResolvedValue(season);

    jest.spyOn(cropRepository, 'create').mockResolvedValue(dataMockCrop);

    const result = await createCropUseCase.execute(data);
    expect(cropRepository.create).toHaveBeenCalledWith({
      name: data.name,
      seasonId: data.seasonId,
    });
    expect(result).toEqual(dataMockCrop);
  });

  it('should throw notFoundException if dont found season', async () => {
    const data: CreateCropDto = { name: 'Wheat', seasonId: '123' };

    jest.spyOn(seasonRepository, 'findById').mockResolvedValue(null);

    expect(createCropUseCase.execute(data)).rejects.toThrow(NotFoundException);
  });
});
