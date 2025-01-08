import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditDescDto {

  @IsString()
  @IsOptional()
  description?: string;
}
