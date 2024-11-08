import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from './entities/password.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreatePasswordDto } from './dto/create-password.dto';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createRecord(createPasswordDto: CreatePasswordDto) {
    return await this.passwordRepository.save(createPasswordDto);
  }

  async sendLink(email: string) {
    const existedEmail = await this.userService.findOne(email);

    if (!existedEmail) {
      throw new HttpException(
        'Немає акаунту з цією адресою',
        HttpStatus.NOT_FOUND,
      );
    }

    const token = this.jwtService.sign({ email });

    await this.createRecord({
      email,
      token,
    });

    return { token, message: 'success' };
  }

  async remove(id: number) {
    const user = await this.passwordRepository.findOne({
      where: { id },
    });
    if (!user)
      throw new HttpException(
        'Немає акаунту з цією адресою',
        HttpStatus.NOT_FOUND,
      );
    await this.passwordRepository.delete(id);
    return { success: true };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const data: any = await this.passwordRepository.findOne({
      where: {
        token: resetPasswordDto.token,
      },
    });

    const user = await this.userService.findOne(data.email);

    if (!user) {
      throw new HttpException(
        'Немає акаунту з цією адресою',
        HttpStatus.NOT_FOUND,
      );
    }

    const hashedPassword = await argon2.hash(resetPasswordDto.password);

    await this.userService.updateUser(user.id, { password: hashedPassword });

    await this.remove(data.id);

    return user;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findOne(changePasswordDto.email);

    if (!user)
      throw new HttpException(
        'Немає акаунту з цією адресою',
        HttpStatus.NOT_FOUND,
      );

    const isCorrectOldPassword = await argon2.verify(
      user.password,
      changePasswordDto.old_password,
    );

    if (!isCorrectOldPassword)
      throw new HttpException(
        'Некоректний попередній пароль',
        HttpStatus.BAD_REQUEST,
      );

    const hashedNewPassword = await argon2.hash(changePasswordDto.new_password);

    await this.userService.updateUser(user.id, { password: hashedNewPassword });

    return {
      email: user.email,
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
      message: 'Password successfully updated',
      status: 200,
    };
  }
}
