import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCardDto: CreateCardDto) {
    return await this.cardRepository.save(createCardDto);
  }

  async findAll() {
    const cards = await this.cardRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return cards;
  }

  findOne(id: number) {
    const card = this.cardRepository.findOne({
      where: { id },
    });
    return card;
  }

  async update(
    id: number,
    updateCardDto: UpdateCardDto,
    image_id?: string,
    image_url?: string,
  ) {
    try {
      const card = await this.cardRepository.findOne({
        where: { id },
      });
      if (!card) throw new NotFoundException('card not found');

      if (image_id) {
        await this.cardRepository.update(id, {
          ...updateCardDto,
          image_id,
          image_url,
        });
        return { message: 'card successfully updated' };
      }
      await this.cardRepository.update(id, updateCardDto);
      return { message: 'card successfully updated' };
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    const card = await this.cardRepository.findOne({
      where: { id },
    });
    if (!card) throw new NotFoundException('image not found');
    await this.cloudinaryService.deleteFile(card.image_id);
    await this.cardRepository.delete(id);
    return { message: 'Card successfully removed' };
  }
}
