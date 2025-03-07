import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetProducerRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Producer document',
    example: '12345678901',
  })
  document: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Producer ID',
    example: '12345678901',
  })
  id: string;
}
