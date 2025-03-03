import { Farm } from '../../farm.entity';

export class FindAllFarmResponseDto {
  data: Farm[];
  count: number;
}
