import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Farm } from '../farms/farm.entity';
import { Crop } from '../crops/crop.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 4 })
  year: string;

  @ManyToOne(() => Farm, (farm) => farm.seasons)
  farm: Farm;

  @OneToMany(() => Crop, (crop) => crop.season)
  crops: Crop[];
}
