import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Gallery } from './entities/gallery.entity';
import { NotFoundResponse } from '../types';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //create image
  @Post()
  @ApiBody({ type: CreateGalleryDto })
  @ApiResponse({ status: 201, description: 'created', type: Gallery })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill_gallery',
    );
    return this.galleryService.create({
      ...createGalleryDto,
      image_url: response.url,
      image_id: response.public_id,
    });
  }

  //get all images
  @Get()
  @ApiResponse({ status: 200, description: 'get all images', type: [Gallery] })
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
    return this.galleryService.findAll();
  }

  //get image by ID
  @Get(':id')
  @ApiResponse({ status: 200, description: 'get  image by id', type: Gallery })
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
    return this.galleryService.findOne(+id);
  }

  //delete image
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'delete image' })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
