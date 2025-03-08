import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Crop } from '../crops/crop.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Harvest {
  @ApiProperty({
    example: '1',
    description: 'uuid the harvest',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '10',
    description: 'Quantitity of harvest',
    type: Number,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    example: '2021-10-10',
    description: 'Harvest date',
    type: Date,
  })
  @Column()
  harvestDate: Date; // Data da colheita

  @ApiProperty({
    example: '1',
    description: 'Crop id',
    type: String,
  })
  @ManyToOne(() => Crop, (crop) => crop.harvests)
  crop: Crop; // Qual cultura essa colheita pertence
}
