import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Producer name',
    example: 'Lucas',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Producer document',
    example: '12345678901',
  })
  document: string;
}
