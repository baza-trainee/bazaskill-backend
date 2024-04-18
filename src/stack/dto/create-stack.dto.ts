import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStackDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  specialization_id: string;
}
