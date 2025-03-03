import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsUUID()
  @IsNotEmpty()
  seasonId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
