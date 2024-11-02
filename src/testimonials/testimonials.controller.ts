import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('testimonials')
export class TestimonialsController {
  constructor(
    private readonly testimonialsService: TestimonialsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill',
    );
    return this.testimonialsService.create(
      public_id,
      secure_url,
      createTestimonialDto,
    );
  }

  @Get()
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    if (file) {
      const { image_id } = await this.testimonialsService.findOne(+id);
      await this.cloudinaryService.deleteFile(image_id);
      const { public_id, secure_url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill',
      );
      return this.testimonialsService.update(
        +id,
        updateTestimonialDto,
        public_id,
        secure_url,
      );
    }
    return this.testimonialsService.update(+id, updateTestimonialDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const res = this.testimonialsService.remove(+id);
    await this.cloudinaryService.deleteFile((await res).testimonial.image_id);
    return res;
  }
}
