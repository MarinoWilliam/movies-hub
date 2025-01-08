import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchByImdbId {
  @IsString()
  @IsNotEmpty()
  imdbID: string;
}
