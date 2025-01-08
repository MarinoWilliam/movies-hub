import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MakeFavoritDto {
  @IsString()
  @IsNotEmpty()
  movieimdbID: string;

  @IsString()
  @IsOptional()
  description?: string;

}
