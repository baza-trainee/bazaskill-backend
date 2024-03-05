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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponse } from '../types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Testimonial } from './entities/testimonial.entity';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(
    private readonly testimonialsService: TestimonialsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //create testimonial
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create review' })
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
        name_ua: { type: 'string' },
        name_en: { type: 'string' },
        name_pl: { type: 'string' },
        position: { type: 'string' },
        date: { type: 'string' },
        review_ua: { type: 'string' },
        review_en: { type: 'string' },
        review_pl: { type: 'string' },
      },
      required: [
        'file',
        'name_ua',
        'name_en',
        'name_pl',
        'position',
        'date',
        'review_ua',
        'review_en',
        'review_pl',
      ],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { public_id, url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill_pdf',
    );
    return this.testimonialsService.create(
      public_id,
      url,
      createTestimonialDto,
    );
  }

  //get all testimonials
  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all testimonials',
    type: [Testimonial],
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
    return this.testimonialsService.findAll();
  }

  //get testimonial by ID
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'get single testimonial',
    type: Testimonial,
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
    return this.testimonialsService.findOne(+id);
  }

  //update testimonial
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update review' })
  @UseInterceptors(FileInterceptor('file'))
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
        name_ua: { type: 'string' },
        name_en: { type: 'string' },
        name_pl: { type: 'string' },
        position: { type: 'string' },
        date: { type: 'string' },
        review_ua: { type: 'string' },
        review_en: { type: 'string' },
        review_pl: { type: 'string' },
      },
      required: [],
    },
  })
  // @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    if (file) {
      const { image_id } = await this.testimonialsService.findOne(+id);
      await this.cloudinaryService.deleteFile(image_id);
      const { public_id, url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill',
      );
      return this.testimonialsService.update(
        +id,
        updateTestimonialDto,
        public_id,
        url,
      );
    }
    return this.testimonialsService.update(+id, updateTestimonialDto);
  }

  //delete testimonial
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'delete testimonial' })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const res = this.testimonialsService.remove(+id);
    await this.cloudinaryService.deleteFile((await res).testimonial.image_id);
    return res;
  }
}
