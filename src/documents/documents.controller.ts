import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill_pdf',
    );
    const res = this.documentsService.create(
      public_id,
      secure_url,
      createDocumentDto,
    );
    return res;
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    if (file) {
      const { document_id } = await this.documentsService.findOne(+id);
      await this.cloudinaryService.deleteFile(document_id);
      const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill_pdf',
      );
      return this.documentsService.update(
        +id,
        updateDocumentDto,
        public_id,
        secure_url,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const res = await this.documentsService.remove(+id);
    await this.cloudinaryService.deleteFile(res.pdf.document_id);
    return res;
  }
}
