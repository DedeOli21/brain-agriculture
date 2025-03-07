import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, Max, Min } from 'class-validator';

export class FindAllProducerQueryRequestDto {
  @ApiProperty({
    description: 'Number of records to skip',
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    return parseInt(value);
  })
  skip?: number = 0;

  @ApiProperty({
    description: 'number of records to take',
    example: 10,
    required: false,
    default: 10,
  })
  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  take?: number = 10;
}
