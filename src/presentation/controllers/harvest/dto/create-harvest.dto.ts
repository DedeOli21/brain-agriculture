import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({
    description: 'ID of the crop that will be harvested',
    example: '123e4567-ee2bhg-137a-665d-9c1a4d8b0f0',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  cropId: string; // ID da cultura que será colhida

  @ApiProperty({
    description: 'Amount harvested (ex: tons)',
    example: 100,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number; // Quantidade colhida (ex: toneladas)

  @ApiProperty({
    description: 'Harvest date',
    example: '2021-12-31',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  harvestDate: Date; // Data da colheita
}
