import { Column, Entity, Index, OneToMany, Unique, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { Season } from '../season/season.entity';
import { Harvest } from '../harvest/harvest.entity';

@Entity()
@Unique(['name'])
@Index('idx_crop_name', ['name'])
export class Crop extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => Season, (season) => season.crops)
  season: Season; // Qual safra essa cultura pertence

  @OneToMany(() => Harvest, (harvest) => harvest.crop)
  harvests: Harvest[]; // Colheitas associadas a essa cultura
}
