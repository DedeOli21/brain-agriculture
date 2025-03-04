import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Producer } from '../producers/producer.entity';
import { Season } from '../season/season.entity';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  arableArea: number;

  @Column('decimal')
  vegetationArea: number;

  @ManyToOne(() => Producer, (producer) => producer.farms)
  producer: Producer;

  @OneToMany(() => Season, (season) => season.farm)
  seasons: Season[];
}
