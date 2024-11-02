import { IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsString()
  partner_url: string;
}
