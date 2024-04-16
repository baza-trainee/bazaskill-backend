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
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'graduate' },
      { name: 'cources' },
      { name: 'cv' },
    ]),
  )
  async upload(
    @UploadedFiles()
    files: {
      graduate?: Express.Multer.File[];
      cources?: Express.Multer.File[];
      cv: Express.Multer.File[];
    },
  ) {
    const responses = await this.cloudinaryService.uploadMultipleFiles(
      files.graduate,
      'baza_skill_test',
    );
    return responses;
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'graduate' },
      { name: 'cources' },
      { name: 'cv' },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      graduate?: Express.Multer.File[];
      cources?: Express.Multer.File[];
      cv: Express.Multer.File;
    },
    @Body() createCandidateDto: CreateCandidateDto,
  ) {
    const courses_response = await this.cloudinaryService.uploadMultipleFiles(
      files.cources,
      'baza_skill_certificates',
    );
    const cources = createCandidateDto.cources.map((el, index) => ({
      ...el,
      cources_sertificate: courses_response[index].url,
    }));

    const graduate_response = await this.cloudinaryService.uploadMultipleFiles(
      files.graduate,
      'baza_skill_certificates',
    );

    const graduate = createCandidateDto.graduate.map((el, index) => ({
      ...el,
      graduate_sertificate: graduate_response[index].url,
    }));

    const cv_response = await this.cloudinaryService.uploadFile(
      files.cv,
      'baza_skill_cv',
    );

    return this.candidatesService.create({
      ...createCandidateDto,
      cv: cv_response.url,
      cources,
      graduate,
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
