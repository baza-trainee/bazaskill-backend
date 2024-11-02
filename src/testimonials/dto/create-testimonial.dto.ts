import { IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  name_ua: string;

  @IsString()
  name_en: string;

  @IsString()
  name_pl: string;

  @IsString()
  position: string;

  @IsString()
  date: string;

  @IsString()
  image_url: string;

  @IsString()
  image_id: string;

  @IsString()
  review_ua: string;

  @IsString()
  review_en: string;

  @IsString()
  review_pl: string;
}
