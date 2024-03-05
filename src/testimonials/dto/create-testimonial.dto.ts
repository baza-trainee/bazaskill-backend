import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  name_ua: string;

  @ApiProperty()
  @IsString()
  name_en: string;

  @ApiProperty()
  @IsString()
  name_pl: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  image_url: string;

  @ApiProperty()
  @IsString()
  image_id: string;

  @ApiProperty()
  @IsString()
  review_ua: string;

  @ApiProperty()
  @IsString()
  review_en: string;

  @ApiProperty()
  @IsString()
  review_pl: string;
}
