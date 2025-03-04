import { Harvest } from 'src/domain/entities/harvest/harvest.entity';

export abstract class IHarvestRepository {
  create: (harvest: Partial<Harvest>) => Promise<Harvest>;
}
