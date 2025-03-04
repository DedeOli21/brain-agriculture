import { Crop } from '../entities/crops/crop.entity';

export interface ICropRepository {
  create(crop: Partial<Crop>): Promise<Crop>;
}
