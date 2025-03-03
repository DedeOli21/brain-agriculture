import { Season } from "./season.entity";

export interface ISeasonRepository {
  create(season: Partial<Season>): Promise<Season>;
  findById(id: Partial<Season>): Promise<Season>;
}
