import { Farm } from '@domain/entities/farms/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllFarmResponseDto {
  @ApiProperty({
    type: [Farm],
    description: 'Farms',
    example: Farm,
  })
  data: Farm[];

  @ApiProperty({
    type: Number,
    description: 'Total of farms',
    example: 1,
  })
  count: number;
}
