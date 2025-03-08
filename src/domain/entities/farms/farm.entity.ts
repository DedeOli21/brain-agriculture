import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Producer } from '../producers/producer.entity';
import { Season } from '../season/season.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('farm')
export class Farm {
  @ApiProperty({
    example: 'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
    type: String,
    description: 'The id of the farm',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Farm name',
    type: String,
    description: 'The name of the farm',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Osasco',
    type: String,
    description: 'The city of the farm',
  })
  @Column()
  city: string;

  @ApiProperty({
    example: 'SP',
    type: String,
    description: 'The state of the farm',
  })
  @Column()
  state: string;

  @ApiProperty({
    example: 100.5,
    type: Number,
    description: 'The total area of the farm',
  })
  @Column('decimal')
  total_area: number;

  @ApiProperty({
    example: 50.5,
    type: Number,
    description: 'The arable area of the farm',
  })
  @Column('decimal')
  arable_area: number;

  @ApiProperty({
    example: 50.5,
    type: Number,
    description: 'The vegetation area of the farm',
  })
  @Column('decimal')
  vegetation_area: number;

  @ApiProperty({
    example: Producer,
    type: [Producer],
    description: 'the owner of the farm',
  })
  @ManyToOne(() => Producer, (producer) => producer.farms, { eager: false })
  producerId: Producer;

  @ApiProperty({
    example: [Season],
    type: [Season],
    description: 'The seasons of the farm',
  })
  @OneToMany(() => Season, (season) => season.farm)
  seasons: Season[];
}
