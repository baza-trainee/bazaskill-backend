import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HrApplicationService } from './hr_application.service';
import { CreateHrApplicationDto } from './dto/create-hr_application.dto';
import { UpdateHrApplicationDto } from './dto/update-hr_application.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('HR Application')
@Controller('hr-application')
export class HrApplicationController {
  constructor(private readonly hrApplicationService: HrApplicationService) {}

  @Post()
  @ApiBody({ type: CreateHrApplicationDto })
  create(@Body() createHrApplicationDto: CreateHrApplicationDto) {
    return this.hrApplicationService.create(createHrApplicationDto);
  }

  @Get()
  findAll() {
    return this.hrApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrApplicationService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateHrApplicationDto })
  update(
    @Param('id') id: string,
    @Body() updateHrApplicationDto: UpdateHrApplicationDto,
  ) {
    return this.hrApplicationService.update(+id, updateHrApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrApplicationService.remove(+id);
  }
}
