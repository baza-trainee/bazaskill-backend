import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  //password recovery send email
  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    return this.passwordService.sendLink(email);
  }

  //reset password
  @Post('reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto);
  }

  //change password
  @Patch('change')
  @UseGuards(JwtAuthGuard)
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.passwordService.changePassword(changePasswordDto);
  }
}
