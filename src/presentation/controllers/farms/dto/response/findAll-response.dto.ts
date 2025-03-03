import { Farm } from '../../../../../domain/farms/farm.entity';

export class FindAllFarmResponseDto {
  data: Farm[];
  count: number;
}
