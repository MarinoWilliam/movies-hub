import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class MakefavoritDto {
  @IsString()
  @IsNotEmpty()
  movieId: string;

}
