import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerApplicationDto } from './create-partner_application.dto';

export class UpdatePartnerApplicationDto extends PartialType(
  CreatePartnerApplicationDto,
) {}
