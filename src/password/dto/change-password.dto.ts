import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  email: string;

  @IsString()
  old_password: string;

  @IsString()
  new_password: string;
}
