import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateCardDto {
  @ApiProperty()
  @IsUrl()
  name: string;

  @ApiProperty()
  @IsUrl()
  specialization: string;

  @ApiProperty()
  @IsUrl()
  image_url: string;

  @ApiProperty()
  @IsString()
  image_id: string;
}
