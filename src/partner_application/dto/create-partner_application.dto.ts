import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePartnerApplicationDto {
  @ApiProperty()
  @IsString()
  company_name: string;

  @ApiProperty()
  @IsString()
  company_url: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  occupation: string;

  @ApiProperty()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  specialization: string;

  @ApiProperty()
  @IsString()
  message: string;
}
