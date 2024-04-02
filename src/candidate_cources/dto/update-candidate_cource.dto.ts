import { PartialType } from '@nestjs/swagger';
import { CreateCandidateCourceDto } from './create-candidate_cource.dto';

export class UpdateCandidateCourceDto extends PartialType(CreateCandidateCourceDto) {}
