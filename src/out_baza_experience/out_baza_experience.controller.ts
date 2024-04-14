import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OutBazaExperienceService } from './out_baza_experience.service';
import { CreateOutBazaExperienceDto } from './dto/create-out_baza_experience.dto';
import { UpdateOutBazaExperienceDto } from './dto/update-out_baza_experience.dto';

@Controller('out-baza-experience')
export class OutBazaExperienceController {
  constructor(private readonly outBazaExperienceService: OutBazaExperienceService) {}

  @Post()
  create(@Body() createOutBazaExperienceDto: CreateOutBazaExperienceDto) {
    return this.outBazaExperienceService.create(createOutBazaExperienceDto);
  }

  @Get()
  findAll() {
    return this.outBazaExperienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outBazaExperienceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutBazaExperienceDto: UpdateOutBazaExperienceDto) {
    return this.outBazaExperienceService.update(+id, updateOutBazaExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outBazaExperienceService.remove(+id);
  }
}
