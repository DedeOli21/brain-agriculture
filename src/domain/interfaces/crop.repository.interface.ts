import { Crop } from 'src/domain/entities/crops/crop.entity';

export abstract class ICropRepository {
  create: (harvest: Partial<Crop>) => Promise<Crop>;
  findById: (cropId: string) => Promise<Crop>;
  countByCrop: () => Promise<any>;
}
