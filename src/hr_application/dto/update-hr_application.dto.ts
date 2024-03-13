import { PartialType } from '@nestjs/swagger';
import { CreateHrApplicationDto } from './create-hr_application.dto';

export class UpdateHrApplicationDto extends PartialType(CreateHrApplicationDto) {}
