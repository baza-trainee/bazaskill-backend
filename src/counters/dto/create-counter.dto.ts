import { IsNumber } from 'class-validator';

export class CreateCounterDto {
  @IsNumber()
  liveProject: number;

  @IsNumber()
  members: number;

  @IsNumber()
  employed: number;

  @IsNumber()
  technologies: number;

  @IsNumber()
  libraries: number;
}
