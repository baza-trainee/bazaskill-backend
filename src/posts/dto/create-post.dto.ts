import { IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image_url: string;

  @IsString()
  image_id: string;
}
