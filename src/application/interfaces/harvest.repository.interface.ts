import { Harvest } from "src/domain/harvest/harvest.entity";

export abstract class IHarvestRepository {
  create: (harvest: Partial<Harvest>) => Promise<Harvest>;
}
