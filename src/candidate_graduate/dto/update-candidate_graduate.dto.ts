import { PartialType } from '@nestjs/swagger';
import { CreateCandidateGraduateDto } from './create-candidate_graduate.dto';

export class UpdateCandidateGraduateDto extends PartialType(CreateCandidateGraduateDto) {}
