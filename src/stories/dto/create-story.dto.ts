import { IsString } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  name_ua: string;

  @IsString()
  name_en: string;

  @IsString()
  name_pl: string;

  @IsString()
  text_ua: string;

  @IsString()
  text_en: string;

  @IsString()
  text_pl: string;

  @IsString()
  role: string;

  @IsString()
  speciality: string;

  @IsString()
  image_url: string;

  @IsString()
  image_id: string;
}
