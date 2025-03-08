import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from '../farms/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('producer')
export class Producer {
  @ApiProperty({
    example: 'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
    type: String,
    description: 'The id of the producer',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '12345678900',
    type: String,
    description: 'The document of the producer',
  })
  @Column({ unique: true })
  document: string;

  @ApiProperty({
    example: 'John Doe',
    type: String,
    description: 'The name of the producer',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: [Farm],
    type: [Farm],
    description: 'The farms of the producer',
  })
  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];
}
