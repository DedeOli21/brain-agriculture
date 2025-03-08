import { Producer } from '@domain/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateFarmRequestDto {
  @ApiProperty({
    description: 'Farm name',
    example: 'Farm name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Farm city',
    example: 'Farm city',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Farm state',
    example: 'Farm state',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'Farm total area',
    example: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty({
    description: 'Farm arable area',
    example: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  arableArea: number;

  @ApiProperty({
    description: 'Farm vegetation area',
    example: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @ApiProperty({
    description: 'id corresponding to the producer',
    example: 'b4sa-saehr31-3r1-ee12',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  producerId: string;
}
