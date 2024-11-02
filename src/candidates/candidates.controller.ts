import {
  UseInterceptors,
  UploadedFiles,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/upload-cv')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async uploadOne(@UploadedFile() file: Express.Multer.File) {
    let response = {};
    const ext = file.originalname.split('.');
    if (ext[ext.length - 1] === 'docx') {
      response = await this.cloudinaryService.uploadDocx(file, 'baza_skill_cv');
    } else {
      response = await this.cloudinaryService.uploadFile(file, 'baza_skill_cv');
    }
    return response;
  }

  @Post('/upload-graduate')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'graduate' }]))
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidatesService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }
}
