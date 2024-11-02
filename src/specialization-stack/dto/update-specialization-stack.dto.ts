import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecializationStackDto } from './create-specialization-stack.dto';

export class UpdateSpecializationStackDto extends PartialType(
  CreateSpecializationStackDto,
) {}
