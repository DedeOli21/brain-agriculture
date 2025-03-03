import { Crop } from "src/domain/crops/crop.entity";

export abstract class ICropRepository {
  create: (harvest: Partial<Crop>) => Promise<Crop>;
  findById: (cropId: string) => Promise<Crop>;
}
