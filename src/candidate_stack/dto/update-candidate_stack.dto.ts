import { PartialType } from '@nestjs/swagger';
import { CreateCandidateStackDto } from './create-candidate_stack.dto';

export class UpdateCandidateStackDto extends PartialType(CreateCandidateStackDto) {}
