import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, Max, Min, IsUUID } from 'class-validator';

export class FindAllFarmQueryRequestDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    return parseInt(value);
  })
  skip?: number = 0;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  take?: number = 10;

  @IsUUID()
  @IsOptional()
  farmId?: string;
}
