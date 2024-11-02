import { IsString, IsOptional } from 'class-validator';

export class CreateHrApplicationDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsOptional()
  company?: string;

  @IsOptional()
  country?: string;

  @IsString()
  specialization: string;

  @IsString()
  message: string;
}
