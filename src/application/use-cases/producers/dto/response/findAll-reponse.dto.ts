import { Producer } from '@domain/entities/producers/producer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllProducerResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Total of producers',
    example: 1,
  })
  total: number;

  @ApiProperty({
    type: Producer,
    description: 'Producers',
    example: [
      {
        id: '1',
        name: 'Lucas',
        document: '12345678901',
      },
    ],
  })
  producers: Producer[];
}
