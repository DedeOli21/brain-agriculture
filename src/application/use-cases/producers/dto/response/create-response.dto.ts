import { Farm } from '@domain/entities';
import { Producer } from '@domain/entities/producers/producer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerResponseDto extends Producer {
  @ApiProperty({
    example: 'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
    type: String,
    description: 'The id of the producer',
  })
  id: string;

  @ApiProperty({
    example: '12345678900',
    type: String,
    description: 'The document of the producer',
  })
  document: string;

  @ApiProperty({
    example: 'John Doe',
    type: String,
    description: 'The name of the producer',
  })
  name: string;

  @ApiProperty({
    example: [Farm],
    type: [Farm],
    description: 'The farms of the producer',
  })
  farms: Farm[];
}
