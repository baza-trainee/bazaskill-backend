import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartnerApplicationService } from './partner_application.service';
import { CreatePartnerApplicationDto } from './dto/create-partner_application.dto';
import { UpdatePartnerApplicationDto } from './dto/update-partner_application.dto';

@Controller('partner-application')
export class PartnerApplicationController {
  constructor(
    private readonly partnerApplicationService: PartnerApplicationService,
  ) {}

  @Post()
  create(@Body() createPartnerApplicationDto: CreatePartnerApplicationDto) {
    return this.partnerApplicationService.create(createPartnerApplicationDto);
  }

  @Get()
  findAll() {
    return this.partnerApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerApplicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartnerApplicationDto: UpdatePartnerApplicationDto,
  ) {
    return this.partnerApplicationService.update(
      +id,
      updatePartnerApplicationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerApplicationService.remove(+id);
  }
}
