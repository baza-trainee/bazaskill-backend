import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phone_1: string;

  @IsString()
  phone_2: string;

  @IsString()
  email: string;

  @IsString()
  telegram: string;

  @IsString()
  linkedin: string;

  @IsString()
  discord: string;

  @IsString()
  facebook: string;

  @IsString()
  instagram: string;
}
