import { ApiProperty } from '@nestjs/swagger';

export class DeleteProducerResponseDto {
  @ApiProperty({
    type: String,
    description: 'Message',
    example: 'Producer deleted',
  })
  message: string;

  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: 200,
  })
  status: number;
}
