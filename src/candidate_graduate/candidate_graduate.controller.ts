import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidateGraduateService } from './candidate_graduate.service';
import { CreateCandidateGraduateDto } from './dto/create-candidate_graduate.dto';
import { UpdateCandidateGraduateDto } from './dto/update-candidate_graduate.dto';

@Controller('candidate-graduate')
export class CandidateGraduateController {
  constructor(private readonly candidateGraduateService: CandidateGraduateService) {}

  @Post()
  create(@Body() createCandidateGraduateDto: CreateCandidateGraduateDto) {
    return this.candidateGraduateService.create(createCandidateGraduateDto);
  }

  @Get()
  findAll() {
    return this.candidateGraduateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateGraduateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateGraduateDto: UpdateCandidateGraduateDto) {
    return this.candidateGraduateService.update(+id, updateCandidateGraduateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateGraduateService.remove(+id);
  }
}
