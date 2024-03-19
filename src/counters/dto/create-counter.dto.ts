import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCounterDto {
  @ApiProperty()
  @IsNumber()
  liveProject: number;

  @ApiProperty()
  @IsNumber()
  members: number;

  @ApiProperty()
  @IsNumber()
  employed: number;

  @ApiProperty()
  @IsNumber()
  technologies: number;

  @ApiProperty()
  @IsNumber()
  libraries: number;
}
