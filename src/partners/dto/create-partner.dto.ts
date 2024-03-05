import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  partner_url: string;
}
