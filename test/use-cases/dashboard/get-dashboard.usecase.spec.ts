import { DashboardResponseDto } from '@app/use-cases/dashboard/dto/dashboard-response.dto';
import { GetDashboardUseCase } from '@app/use-cases/dashboard/get-dashboard.usecase';
import { ICropRepository } from '@domain/interfaces/crop.repository.interface';
import { IFarmRepository } from '@domain/interfaces/farms.repository.interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetDashboardUseCase', () => {
  let getDashboardUseCase: GetDashboardUseCase;
  let farmRepository: IFarmRepository;
  let cropRepository: ICropRepository;

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
      ],
    }).compile();

    getDashboardUseCase = module.get<GetDashboardUseCase>(GetDashboardUseCase);
    farmRepository = module.get<IFarmRepository>(IFarmRepository);
    cropRepository = module.get<ICropRepository>(ICropRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getDashboardUseCase).toBeDefined();
  });

  it('should return the correct dashboard data', async () => {
    const totalFarms = 10;
    const totalHectares = { total: 1000 };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { name: 'Crop1', count: 6 },
      { name: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 600, vegetationArea: 400 };

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
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
    const totalFarms = 10;
    const totalHectares = { total: 1000 };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { name: 'Crop1', count: 6 },
      { name: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 0, vegetationArea: 0 };

    jest
      .spyOn(farmRepository, 'totalArableAndVegetationArea')
      .mockResolvedValue({ arablearea: null, vegetationarea: null });

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
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
    const totalFarms = 10;
    const totalHectares = { total: null };
    const farmsByState = [
      { state: 'State1', count: 5 },
      { state: 'State2', count: 5 },
    ];
    const cropsDistribution = [
      { name: 'Crop1', count: 6 },
      { name: 'Crop2', count: 4 },
    ];
    const landUsage = { arableArea: 600, vegetationArea: 400 };

    jest.spyOn(farmRepository, 'totalArea').mockResolvedValue({ total: null });

    const result: DashboardResponseDto = await getDashboardUseCase.execute();

    expect(result).toEqual({
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
});
