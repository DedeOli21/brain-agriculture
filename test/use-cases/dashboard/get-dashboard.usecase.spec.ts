import { DashboardResponseDto } from '../../../src/application/use-cases/dashboard/dto/dashboard-response.dto';
import { GetDashboardUseCase } from '../../../src/application/use-cases/dashboard/get-dashboard.usecase';
import { ICropRepository } from '../../../src/domain/interfaces/crop.repository.interface';
import { IFarmRepository } from '../../../src/domain/interfaces/farms.repository.interface';
import { IProducerRepository } from '../../../src/domain/interfaces/producers.repository.interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetDashboardUseCase', () => {
  let getDashboardUseCase: GetDashboardUseCase;
  let cropRepository: ICropRepository;
  let farmRepository: IFarmRepository;
  let producerRepository: IProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDashboardUseCase,
        {
          provide: IFarmRepository,
          useValue: {
            count: jest.fn().mockResolvedValue(10),
            totalArea: jest.fn().mockResolvedValue({ total: 1000 }),
            countByState: jest.fn().mockResolvedValue([
              { state: 'State1', count: 5 },
              { state: 'State2', count: 5 },
            ]),
            totalArableAndVegetationArea: jest
              .fn()
              .mockResolvedValue({ arablearea: 600, vegetationarea: 400 }),
          },
        },
        {
          provide: ICropRepository,
          useValue: {
            countByCrop: jest.fn().mockImplementation(() => [
              { name: 'Crop1', count: 6 },
              { name: 'Crop2', count: 4 },
            ]),
          },
        },
        {
          provide: IProducerRepository,
          useValue: {
            findAll: jest.fn().mockImplementation(() => ({
              producers: [ { name: 'Producer1' }, { name: 'Producer2' } ],
              total: 100,
            })),
          },
        },
      ],
    }).compile();

    getDashboardUseCase = module.get<GetDashboardUseCase>(GetDashboardUseCase);
    farmRepository = module.get<IFarmRepository>(IFarmRepository);
    cropRepository = module.get<ICropRepository>(ICropRepository);
    producerRepository = module.get<IProducerRepository>(IProducerRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getDashboardUseCase).toBeDefined();
  });

  it('should return the correct dashboard data', async () => {
    const totalProducers = 100;
    const totalFarms = 10;
    const totalHectares = { total: 1000 };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { crop: 'Crop1', count: 6 },
      { crop: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 600, vegetationArea: 400 };

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalProducers,
      totalFarms,
      totalHectares: totalHectares.total,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arableArea },
        { type: 'Área de Vegetação', area: landUsage.vegetationArea },
      ],
    });
  });

  it('should return the correct dashboard data missing landUsage', async () => {
    const totalProducers = 100;
    const totalFarms = 10;
    const totalHectares = { total: 1000 };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { crop: 'Crop1', count: 6 },
      { crop: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 0, vegetationArea: 0 };

    jest
      .spyOn(farmRepository, 'totalArableAndVegetationArea')
      .mockResolvedValue({ arablearea: null, vegetationarea: null });

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalProducers,
      totalFarms,
      totalHectares: totalHectares.total,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arableArea },
        { type: 'Área de Vegetação', area: landUsage.vegetationArea },
      ],
    });
  });

  it('should return totalArea as 0 if totalArea is null', async () => {
    const totalProducers = 100;
    const totalFarms = 10;
    const totalHectares = { total: null };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { crop: 'Crop1', count: 6 },
      { crop: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 600, vegetationArea: 400 };

    jest.spyOn(farmRepository, 'totalArea').mockResolvedValue(totalHectares);

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalProducers,
      totalFarms,
      totalHectares: 0,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arableArea },
        { type: 'Área de Vegetação', area: landUsage.vegetationArea },
      ],
    });
  });

  it('should return cropsDistribution as empty array if countByCrop returns null', async () => {
    const totalProducers = 100;
    const totalFarms = 10;
    const totalHectares = { total: 1000 };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [];
    const landUsage = { arableArea: 600, vegetationArea: 400 };

    jest.spyOn(cropRepository, 'countByCrop').mockResolvedValue([]);

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalProducers,
      totalFarms,
      totalHectares: totalHectares.total,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arableArea },
        { type: 'Área de Vegetação', area: landUsage.vegetationArea },
      ],
    });
  });

  it('should return totalProducers as 0 if findAll returns null', async () => {
    const totalProducers = 0;
    const totalFarms = 10;
    const totalHectares = { total: 1000 };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { crop: 'Crop1', count: 6 },
      { crop: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 600, vegetationArea: 400 };

    jest.spyOn(producerRepository, 'findAll').mockResolvedValue({ producers: [], total: 0 });

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalProducers,
      totalFarms,
      totalHectares: totalHectares.total,
      farmsByState,
      cropsDistribution,
      landUsage: [
        { type: 'Área Agricultável', area: landUsage.arableArea },
        { type: 'Área de Vegetação', area: landUsage.vegetationArea },
      ],
    });
  });
});
