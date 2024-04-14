import { PartialType } from '@nestjs/swagger';
import { CreateBazaExperienceDto } from './create-baza_experience.dto';

export class UpdateBazaExperienceDto extends PartialType(CreateBazaExperienceDto) {}
