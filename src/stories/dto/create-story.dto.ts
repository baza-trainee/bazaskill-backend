import { IsString } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  speciality: string;

  @IsString()
  text: string;

  @IsString()
  image_url: string;

  @IsString()
  image_id: string;
}
