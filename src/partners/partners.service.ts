import { Partner } from './entities/partner.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnersRepository: Repository<Partner>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  create(
    public_cloudinary_id: string,
    image_url: string,
    createPartnerDto: CreatePartnerDto,
  ) {
    return this.partnersRepository.save({
      ...createPartnerDto,
      image_url,
      public_cloudinary_id,
    });
  }

  findAll() {
    return this.partnersRepository.find();
  }

  findOne(id: number) {
    return this.partnersRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePartnerDto: UpdatePartnerDto,
    public_cloudinary_id?: string,
    image_url?: string,
  ) {
    const partner = await this.partnersRepository.findOne({
      where: { id },
    });
    if (!partner) throw new NotFoundException('This partner not found');
    if (public_cloudinary_id) {
      return await this.partnersRepository.update(id, {
        ...updatePartnerDto,
        public_cloudinary_id,
        image_url,
      });
    }
    return await this.partnersRepository.update(id, updatePartnerDto);
  }

  async remove(id: number) {
    const partner = await this.partnersRepository.findOne({
      where: { id },
    });
    if (!partner) throw new NotFoundException('This partner not found');
    await this.partnersRepository.delete(id);
    await this.cloudinaryService.deleteFile(partner.public_cloudinary_id);
    return { message: 'partner successefuly deleted', partner };
  }
}
