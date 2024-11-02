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
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
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
      image_url: response.secure_url,
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
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const { image_id } = await this.cardsService.findOne(+id);
      await this.cloudinaryService.deleteFile(image_id);
      const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill_gallery',
      );
      return this.cardsService.update(
        +id,
        updateCardDto,
        public_id,
        secure_url,
      );
    }
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
