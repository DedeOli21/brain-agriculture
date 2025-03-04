import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateSeasonDto {
  @IsUUID()
  @IsNotEmpty()
  farmId: string; // ID da fazenda onde a safra será registrada

  @IsString()
  @IsNotEmpty()
  name: string; // Nome da safra (ex: "Safra 2024")

  @IsString()
  @IsNotEmpty()
  year: string; // Ano da safra (ex: "2024")
}
