import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidateLanguagesService } from './candidate_languages.service';
import { CreateCandidateLanguageDto } from './dto/create-candidate_language.dto';
import { UpdateCandidateLanguageDto } from './dto/update-candidate_language.dto';

@Controller('candidate-languages')
export class CandidateLanguagesController {
  constructor(private readonly candidateLanguagesService: CandidateLanguagesService) {}

  @Post()
  create(@Body() createCandidateLanguageDto: CreateCandidateLanguageDto) {
    return this.candidateLanguagesService.create(createCandidateLanguageDto);
  }

  @Get()
  findAll() {
    return this.candidateLanguagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateLanguagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateLanguageDto: UpdateCandidateLanguageDto) {
    return this.candidateLanguagesService.update(+id, updateCandidateLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateLanguagesService.remove(+id);
  }
}
