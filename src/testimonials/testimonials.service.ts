import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from './entities/testimonial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialsRepository: Repository<Testimonial>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    image_id: string,
    image_url: string,
    createTestimonialDto: CreateTestimonialDto,
  ) {
    await this.testimonialsRepository.save({
      ...createTestimonialDto,
      image_id,
      image_url,
    });
  }

  async findAll() {
    try {
      const testimonials = await this.testimonialsRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
      return testimonials;
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const testimonial = await this.testimonialsRepository.findOne({
        where: { id },
      });
      if (!testimonial) throw new NotFoundException('This review not found');
      return testimonial;
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateTestimonialDto: UpdateTestimonialDto,
    image_id?: string,
    image_url?: string,
  ) {
    try {
      const testimonial = await this.testimonialsRepository.findOne({
        where: { id },
      });
      if (!testimonial) throw new NotFoundException('This review not found');
      await this.testimonialsRepository.update(id, {
        ...updateTestimonialDto,
        image_id,
        image_url,
      });
      return { message: 'review successfully updated', testimonial };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const testimonial = await this.testimonialsRepository.findOne({
        where: { id },
      });
      if (!testimonial) throw new NotFoundException('This review not found');
      await this.testimonialsRepository.delete(id);
      await this.cloudinaryService.deleteFile(testimonial.image_id);
      return { message: 'review successfully deleted', testimonial };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
