import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

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
