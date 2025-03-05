import { Farm } from '@domain/entities/farms/farm.entity';

export class FindAllFarmResponseDto {
  data: Farm[];
  count: number;
}
