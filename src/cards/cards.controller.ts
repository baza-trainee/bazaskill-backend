import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateGalleryDto } from 'src/gallery/dto/create-gallery.dto';
import { Card } from './entities/card.entity';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiBody({ type: CreateGalleryDto })
  @ApiResponse({ status: 201, description: 'created', type: Card })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCardDto: CreateCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill_gallery',
    );
    return this.cardsService.create({
      ...createCardDto,
      image_url: response.url,
      image_id: response.public_id,
    });
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const { image_id } = await this.cardsService.findOne(+id);
      await this.cloudinaryService.deleteFile(image_id);
      const { public_id, url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill_gallery',
      );
      return this.cardsService.update(+id, updateCardDto, public_id, url);
    }
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
