import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BazaExperienceService } from './baza_experience.service';
import { CreateBazaExperienceDto } from './dto/create-baza_experience.dto';
import { UpdateBazaExperienceDto } from './dto/update-baza_experience.dto';

@Controller('baza-experience')
export class BazaExperienceController {
  constructor(private readonly bazaExperienceService: BazaExperienceService) {}

  @Post()
  create(@Body() createBazaExperienceDto: CreateBazaExperienceDto) {
    return this.bazaExperienceService.create(createBazaExperienceDto);
  }

  @Get()
  findAll() {
    return this.bazaExperienceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bazaExperienceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBazaExperienceDto: UpdateBazaExperienceDto,
  ) {
    return this.bazaExperienceService.update(+id, updateBazaExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bazaExperienceService.remove(+id);
  }
}
