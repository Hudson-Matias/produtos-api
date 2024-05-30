import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
