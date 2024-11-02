import { IsString, IsOptional } from 'class-validator';

export class CreatePartnerApplicationDto {
  @IsString()
  company_name: string;

  @IsString()
  company_url: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  position: string;

  @IsOptional()
  country: string;

  @IsString()
  specialist: string;

  @IsString()
  message: string;
}
