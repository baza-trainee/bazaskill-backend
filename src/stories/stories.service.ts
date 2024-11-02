import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { StoryEntity } from './entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly storiesRepository: Repository<StoryEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    image_id: string,
    image_url: string,
    createStoryDto: CreateStoryDto,
  ) {
    const story = await this.storiesRepository.save({
      ...createStoryDto,
      image_id,
      image_url,
    });
    return {
      message: 'Story successfully created',
      story,
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    try {
      const stories = await this.storiesRepository.find({
        order: {
          created_at: 'DESC',
        },
      });
      return stories;
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const story = await this.storiesRepository.findOne({
        where: { id },
      });
      if (!story) throw new NotFoundException('This story not found');
      return story;
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateStoryDto: UpdateStoryDto,
    image_id?: string,
    image_url?: string,
  ) {
    try {
      const story = await this.storiesRepository.findOne({
        where: { id },
      });
      if (!story) throw new NotFoundException('This story not found');
      await this.storiesRepository.update(id, {
        ...updateStoryDto,
        image_id,
        image_url,
      });
      return { message: 'Story successfully updated', story };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const story = await this.storiesRepository.findOne({
        where: { id },
      });
      if (!story) throw new NotFoundException('This review not found');
      await this.storiesRepository.delete(id);
      await this.cloudinaryService.deleteFile(story.image_id);
      return {
        message: 'Story successfully deleted',
        story,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
