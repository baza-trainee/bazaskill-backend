import { IsEmail, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be minimum 6 symbols' })
  password: string;

  @IsString()
  role: string;
}
