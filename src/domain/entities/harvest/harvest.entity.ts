import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Crop } from '../crops/crop.entity';

@Entity()
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // Quantidade colhida (ex: toneladas)

  @Column()
  harvestDate: Date; // Data da colheita

  @ManyToOne(() => Crop, (crop) => crop.harvests)
  crop: Crop; // Qual cultura essa colheita pertence
}
