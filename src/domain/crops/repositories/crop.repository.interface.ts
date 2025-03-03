import { Crop } from '../crop.entity';

export interface ICropRepository {
  create(crop: Partial<Crop>): Promise<Crop>;
}