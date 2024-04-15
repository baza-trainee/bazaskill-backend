import { UseInterceptors, UploadedFiles, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'graduate'},
    {name: 'cources'},
    {name: 'cv'}
  ]))
  create(
    @UploadedFiles() files: {graduate?: Express.Multer.File[], cources?:  Express.Multer.File[], cv: Express.Multer.File[]},
    @Body() createCandidateDto: CreateCandidateDto
  ) {
    const cources = createCandidateDto.cources.map((el, index) =>({...el, cources_sertificate: 'string'}))
    const graduate = createCandidateDto.graduate.map((el, index) =>({...el, graduate_sertificate: 'string'}))
    return this.candidatesService.create({...createCandidateDto, cv: 'string', cources, graduate}); 
  }

  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id); 
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidatesService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }
}
