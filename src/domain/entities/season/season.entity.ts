import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Farm } from '../farms/farm.entity';
import { Crop } from '../crops/crop.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Season {
  @ApiProperty({
    example: '1',
    description: 'uuid the season',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Summer',
    description: 'Name of the season',
    type: String,
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    example: '2021',
    description: 'Year of the season',
    type: String,
  })
  @Column({ type: 'varchar', length: 4 })
  year: string;


  @ApiProperty({
    example: '1',
    description: 'Farm id',
    type: String,
  })
  @ManyToOne(() => Farm, (farm) => farm.seasons)
  farm: Farm;

  @ApiProperty({
    example: '1',
    description: 'Crops of the season',
    type: [Crop],
  })
  @OneToMany(() => Crop, (crop) => crop.season)
  crops: Crop[];
}
