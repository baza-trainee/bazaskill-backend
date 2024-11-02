import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateCourceDto } from './create-candidate_cource.dto';

export class UpdateCandidateCourceDto extends PartialType(
  CreateCandidateCourceDto,
) {}
