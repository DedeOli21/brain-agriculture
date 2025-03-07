import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProducerRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
