/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UseInterceptors,
  UploadedFiles,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/upload-cv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOne(@UploadedFile() file: Express.Multer.File) {
    const responses = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill_cv',
    );
    return responses;
  }

  @Post('/upload-graduate')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'graduate' }]))
  async uploadGraduate(
    @UploadedFiles()
    files: {
      graduate?: Express.Multer.File[];
    },
  ) {
    const responses = await this.cloudinaryService.uploadMultipleFiles(
      files.graduate,
      'baza_skill_certificates',
    );
    return responses;
  }

  @Post('/upload-cources')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'cources' }]))
  async uploadCources(
    @UploadedFiles()
    files: {
      cources?: Express.Multer.File[];
    },
  ) {
    const responses = await this.cloudinaryService.uploadMultipleFiles(
      files.cources,
      'baza_skill_certificates',
    );
    return responses;
  }

  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create({
      ...createCandidateDto,
    });
  }

  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id);
  }

  @Post(':id')
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
