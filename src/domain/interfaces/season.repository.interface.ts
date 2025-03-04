import { Season } from 'src/domain/entities/season/season.entity';

export abstract class ISeasonRepository {
  create: (season: Partial<Season>) => Promise<Season>;
  findById: (id: Partial<Season>) => Promise<Season>;
}
