import { ApiProperty } from '@nestjs/swagger';

export class CountByCropDto {
  @ApiProperty({
    example: 'Banana',
    description: 'Name of the crop',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Number of crops',
    type: Number,
  })
  count: number;
}
