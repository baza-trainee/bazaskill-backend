import { IsString, IsUrl } from 'class-validator';

export class CreateCardDto {
  @IsUrl()
  name: string;

  @IsUrl()
  specialization: string;

  @IsUrl()
  image_url: string;

  @IsString()
  image_id: string;
}
