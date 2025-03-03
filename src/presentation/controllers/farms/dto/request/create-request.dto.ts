import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateFarmRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalArea: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  arableArea: number;

  vegetationArea: number;

  @IsNotEmpty()
  @IsString()
  producerId: string;
}
