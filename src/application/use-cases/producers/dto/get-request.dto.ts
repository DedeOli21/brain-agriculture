import { IsOptional, IsString } from 'class-validator';

export class GetProducerRequestDto {
  @IsOptional()
  @IsString()
  document: string;

  @IsOptional()
  @IsString()
  id: string;
}
