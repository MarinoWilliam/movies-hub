import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchByTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
