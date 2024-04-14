import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidateCourcesService } from './candidate_cources.service';
import { CreateCandidateCourceDto } from './dto/create-candidate_cource.dto';
import { UpdateCandidateCourceDto } from './dto/update-candidate_cource.dto';

@Controller('candidate-cources')
export class CandidateCourcesController {
  constructor(private readonly candidateCourcesService: CandidateCourcesService) {}

  @Post()
  create(@Body() createCandidateCourceDto: CreateCandidateCourceDto) {
    return this.candidateCourcesService.create(createCandidateCourceDto);
  }

  @Get()
  findAll() {
    return this.candidateCourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateCourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateCourceDto: UpdateCandidateCourceDto) {
    return this.candidateCourcesService.update(+id, updateCandidateCourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateCourcesService.remove(+id);
  }
}
