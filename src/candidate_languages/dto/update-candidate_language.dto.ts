import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateLanguageDto } from './create-candidate_language.dto';

export class UpdateCandidateLanguageDto extends PartialType(
  CreateCandidateLanguageDto,
) {}
