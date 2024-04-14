import { PartialType } from '@nestjs/swagger';
import { CreateOutBazaExperienceDto } from './create-out_baza_experience.dto';

export class UpdateOutBazaExperienceDto extends PartialType(CreateOutBazaExperienceDto) {}
