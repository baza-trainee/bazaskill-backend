import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createGalleryDto: CreateGalleryDto) {
    return await this.galleryRepository.save(createGalleryDto);
  }

  async findAll() {
    const images = await this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return images;
  }

  async findOne(id: number) {
    const image = await this.galleryRepository.findOne({
      where: { id },
    });
    if (!image) throw new NotFoundException('image not found');
    return image;
  }

  async remove(id: number) {
    const image = await this.galleryRepository.findOne({
      where: { id },
    });
    if (!image) throw new NotFoundException('image not found');
    await this.cloudinaryService.deleteFile(image.image_id);
    await this.galleryRepository.delete(id);
    return { message: 'Image successfully removed' };
  }
}
