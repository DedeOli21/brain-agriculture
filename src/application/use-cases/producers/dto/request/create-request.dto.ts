import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  document: string;
}
