import { Farm } from 'src/domain/entities/farms/farm.entity';

export class FindAllFarmResponseDto {
  data: Farm[];
  count: number;
}
