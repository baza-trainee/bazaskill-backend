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
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotFoundResponse } from 'src/types';
import { Document } from './entities/document.entity';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload PDF document' })
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string' },
      },
      required: ['file', 'title'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    const { public_id, url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill_pdf',
    );
    const res = this.documentsService.create(public_id, url, createDocumentDto);
    return res;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all documents',
    type: [Document],
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'get  document by id',
    type: Document,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update PDF document' })
  @ApiBody({
    description: 'Upload a file',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string' },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    if (file) {
      const { document_id } = await this.documentsService.findOne(+id);
      await this.cloudinaryService.deleteFile(document_id);
      const { public_id, url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill_pdf',
      );
      return this.documentsService.update(
        +id,
        updateDocumentDto,
        public_id,
        url,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.documentsService.remove(+id);
    await this.cloudinaryService.deleteFile(res.pdf.document_id);
    return res;
  }
}
