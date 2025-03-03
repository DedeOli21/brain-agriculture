import { Farm } from "src/domain/farms/farm.entity";

export class FindAllFarmResponseDto {
  data: Farm[];
  count: number;
}
