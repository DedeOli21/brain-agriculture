import { CreateSeasonUseCase } from '../../../src/application/use-cases/season/create-season.usecase';
import { CreateSeasonDto } from '../../../src/application/use-cases/season/dto/create-season.dto';
import { Farm } from '../../../src/domain/entities/farms/farm.entity';
import { Season } from '../../../src/domain/entities/season/season.entity';
import { IFarmRepository } from '../../../src/domain/interfaces/farms.repository.interface';
import { ISeasonRepository } from '../../../src/domain/interfaces/season.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateSeasonUseCase', () => {
  let createSeasonUseCase: CreateSeasonUseCase;
  let seasonRepository: ISeasonRepository;
  let farmRepository: IFarmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSeasonUseCase,
        {
          provide: ISeasonRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: IFarmRepository,
          useValue: {
            findFarmById: jest.fn(),
          },
        },
      ],
    }).compile();

    createSeasonUseCase = module.get<CreateSeasonUseCase>(CreateSeasonUseCase);
    seasonRepository = module.get<ISeasonRepository>(ISeasonRepository);
    farmRepository = module.get<IFarmRepository>(IFarmRepository);
  });

  it('should be defined', () => {
    expect(createSeasonUseCase).toBeDefined();
  });

  it('should call findFarmById on farmRepository with correct farm ID', async () => {
    const data: CreateSeasonDto = {
      name: 'Spring',
      year: '2023',
      farmId: '123',
    };

    jest
      .spyOn(farmRepository, 'findFarmById')
      .mockResolvedValue({ id: '123', name: 'Test Farm' } as Farm);
    await createSeasonUseCase.execute(data);
    expect(farmRepository.findFarmById).toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException if farm is not found', async () => {
    const data: CreateSeasonDto = {
      name: 'Spring',
      year: '2023',
      farmId: '123',
    };
    jest.spyOn(farmRepository, 'findFarmById').mockResolvedValue(null);

    await expect(createSeasonUseCase.execute(data)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should call create on seasonRepository with correct data', async () => {
    const data: CreateSeasonDto = {
      name: 'Spring',
      year: '2023',
      farmId: '123',
    };
    const farm: Farm = { id: '123', name: 'Test Farm' } as Farm;
    const season: Season = {
      id: '456',
      name: 'Spring',
      year: '2023',
      farm,
      crops: [],
    } as Season;

    jest.spyOn(farmRepository, 'findFarmById').mockResolvedValue(farm);
    jest.spyOn(seasonRepository, 'create').mockResolvedValue(season);

    const result = await createSeasonUseCase.execute(data);
    expect(seasonRepository.create).toHaveBeenCalledWith({
      name: data.name,
      year: data.year,
      farm,
    });
    expect(result).toEqual(season);
  });
});
