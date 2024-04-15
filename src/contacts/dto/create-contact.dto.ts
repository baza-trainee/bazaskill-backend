import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  phone_1: string;

  @ApiProperty()
  @IsString()
  phone_2: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  telegram: string;

  @ApiProperty()
  @IsString()
  linkedin: string;

  @ApiProperty()
  @IsString()
  discord: string;

  @ApiProperty()
  @IsString()
  facebook: string;

  @ApiProperty()
  @IsString()
  instagram: string;
}
