import { PartialType } from '@nestjs/mapped-types';
import { CreateBazaExperienceDto } from './create-baza_experience.dto';

export class UpdateBazaExperienceDto extends PartialType(
  CreateBazaExperienceDto,
) {}
