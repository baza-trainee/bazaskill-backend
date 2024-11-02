import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateGraduateDto } from './create-candidate_graduate.dto';

export class UpdateCandidateGraduateDto extends PartialType(
  CreateCandidateGraduateDto,
) {}
