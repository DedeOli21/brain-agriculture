import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @ApiProperty({
    example: 'c1c9b4f1-9f5b-4f3e-8c2c-7c3c0f6b5b8d',
    description: 'Season ID',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  seasonId: string;

  @ApiProperty({
    example: 'Banana',
    description: 'Name of the crop',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
