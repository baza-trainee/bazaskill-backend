import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title_ua: string;

  @ApiProperty()
  @IsString()
  title_en: string;

  @ApiProperty()
  @IsString()
  title_pl: string;

  @ApiProperty()
  @IsString()
  text_ua: string;

  @ApiProperty()
  @IsString()
  text_en: string;

  @ApiProperty()
  @IsString()
  text_pl: string;

  @ApiProperty()
  @IsUrl()
  link: string;

  @ApiProperty()
  @IsUrl()
  image_url: string;

  @ApiProperty()
  @IsString()
  image_id: string;
}
