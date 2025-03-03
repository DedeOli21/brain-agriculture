import { IsUUID, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateHarvestDto {
  @IsUUID()
  @IsNotEmpty()
  cropId: string; // ID da cultura que será colhida

  @IsNumber()
  @IsNotEmpty()
  amount: number; // Quantidade colhida (ex: toneladas)

  @IsDate()
  @IsNotEmpty()
  harvestDate: Date; // Data da colheita
}
