import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({
    description: 'ID of the farm where the season will be registered',
    example: '123e4567-ee2bhg-137a-665d-9c1a4d8b0f0',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  farmId: string; // ID da fazenda onde a safra será registrada

  @ApiProperty({
    description: 'Season name',
    example: 'Season name',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Year of the season',
    example: '2024',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  year: string;
}
