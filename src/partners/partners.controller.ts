import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
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
  // UseGuards,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(
    private readonly partnersService: PartnersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a Partner' })
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
        name: { type: 'string' },
        partner_url: { type: 'string' },
      },
      required: ['file', 'name', 'partner_url'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPartnerDto: CreatePartnerDto,
  ) {
    const { public_id, url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill',
    );
    const res = this.partnersService.create(public_id, url, createPartnerDto);
    return res;
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a Partner' })
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
        name: { type: 'string' },
        partner_url: { type: 'string' },
      },
      required: ['name', 'partner_url'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updatePartnerDto: UpdatePartnerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const { public_cloudinary_id } = await this.partnersService.findOne(id);
      await this.cloudinaryService.deleteFile(public_cloudinary_id);
      const { public_id, url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill',
      );
      return this.partnersService.update(+id, updatePartnerDto, public_id, url);
    }
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const res = await this.partnersService.remove(+id);
    await this.cloudinaryService.deleteFile(res.partner.public_cloudinary_id);
    return res;
  }
}
