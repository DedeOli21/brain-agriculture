import {
  Column,
  Entity,
  Index,
  OneToMany,
  Unique,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { Season } from '../season/season.entity';
import { Harvest } from '../harvest/harvest.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('season')
@Unique(['name'])
@Index('idx_crop_name', ['name'])
export class Crop extends BaseEntity {
  @ApiProperty({
    example: 'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
    type: String,
    description: 'The id of the crop',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Tomato',
    type: String,
    description: 'The name of the crop',
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    example: 'Tomato is a red fruit',
    type: String,
    description: 'The description of the crop',
  })
  @ManyToOne(() => Season, (season) => season.crops)
  season: Season; // Qual safra essa cultura pertence

  @ApiProperty({
    example: [Harvest],
    type: [Harvest],
    description: 'The harvests of the crop',
  })
  @OneToMany(() => Harvest, (harvest) => harvest.crop)
  harvests: Harvest[]; // Colheitas associadas a essa cultura
}
