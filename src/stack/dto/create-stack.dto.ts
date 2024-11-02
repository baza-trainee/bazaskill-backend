import { IsString } from 'class-validator';

export class CreateStackDto {
  @IsString()
  title: string;

  @IsString()
  specialization_id: string;
}
