import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateStackDto } from './create-candidate_stack.dto';

export class UpdateCandidateStackDto extends PartialType(
  CreateCandidateStackDto,
) {}
