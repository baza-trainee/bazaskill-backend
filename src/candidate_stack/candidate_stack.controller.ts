import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidateStackService } from './candidate_stack.service';
import { CreateCandidateStackDto } from './dto/create-candidate_stack.dto';
import { UpdateCandidateStackDto } from './dto/update-candidate_stack.dto';

@Controller('candidate-stack')
export class CandidateStackController {
  constructor(private readonly candidateStackService: CandidateStackService) {}

  @Post()
  create(@Body() createCandidateStackDto: CreateCandidateStackDto) {
    return this.candidateStackService.create(createCandidateStackDto);
  }

  @Get()
  findAll() {
    return this.candidateStackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateStackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateStackDto: UpdateCandidateStackDto) {
    return this.candidateStackService.update(+id, updateCandidateStackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateStackService.remove(+id);
  }
}
