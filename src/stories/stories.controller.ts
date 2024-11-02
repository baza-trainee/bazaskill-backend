import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('stories')
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createStoryDto: CreateStoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill',
    );
    return this.storiesService.create(public_id, secure_url, createStoryDto);
  }

  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    if (file) {
      const { image_id } = await this.storiesService.findOne(+id);
      await this.cloudinaryService.deleteFile(image_id);
      const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill',
      );
      return this.storiesService.update(
        +id,
        updateStoryDto,
        public_id,
        secure_url,
      );
    }
    return this.storiesService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const res = this.storiesService.remove(+id);
    await this.cloudinaryService.deleteFile((await res).story.image_id);
    return res;
  }
}
