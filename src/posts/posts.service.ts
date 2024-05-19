import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    image_id: string,
    image_url: string,
    createPostDto: CreatePostDto,
  ) {
    return await this.postsRepository.save({
      ...createPostDto,
      image_url,
      image_id,
    });
  }

  async findAll() {
    const posts = await this.postsRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    image_id?: string,
    image_url?: string,
  ) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('Post not found');
    if (image_id) {
      return await this.postsRepository.update(id, {
        ...updatePostDto,
        image_id,
        image_url,
      });
    }
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('Post not found');
    await this.postsRepository.delete(id);
    await this.cloudinaryService.deleteFile(post.image_id);
    return { message: 'post successefuly deleted', post };
  }
}
