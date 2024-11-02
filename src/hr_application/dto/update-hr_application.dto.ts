import { PartialType } from '@nestjs/mapped-types';
import { CreateHrApplicationDto } from './create-hr_application.dto';

export class UpdateHrApplicationDto extends PartialType(
  CreateHrApplicationDto,
) {}
