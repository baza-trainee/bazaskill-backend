import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  // UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundResponse } from 'src/types';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostEntity } from './entities/post.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //create post
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a Post' })
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
        title_ua: { type: 'string' },
        title_en: { type: 'string' },
        title_pl: { type: 'string' },
        text_ua: { type: 'string' },
        text_en: { type: 'string' },
        text_pl: { type: 'string' },
        link: { type: 'string' },
      },
      required: [
        'file',
        'title_ua',
        'title_en',
        'title_pl',
        'text_ua',
        'text_en',
        'text_pl',
        'link',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: PostEntity,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
  })
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    const { public_id, url } = await this.cloudinaryService.uploadFile(
      file,
      'baza_skill',
    );
    const res = this.postsService.create(public_id, url, createPostDto);
    return res;
  }

  //get all posts
  @Get()
  @ApiOperation({ summary: 'Get posts' })
  @ApiResponse({
    status: 200,
    description: 'get all testimonials',
    type: [PostEntity],
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
    return this.postsService.findAll();
  }

  //get post by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiOkResponse({
    type: PostEntity,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  //update post
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update post' })
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
        title_ua: { type: 'string' },
        title_en: { type: 'string' },
        title_pl: { type: 'string' },
        text_ua: { type: 'string' },
        text_en: { type: 'string' },
        text_pl: { type: 'string' },
        link: { type: 'string' },
      },
      required: [
        'title_ua',
        'title_en',
        'title_pl',
        'text_ua',
        'text_en',
        'text_pl',
        'link',
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'update post',
    type: PostEntity,
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
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const { image_id } = await this.postsService.findOne(id);
      await this.cloudinaryService.deleteFile(image_id);
      const { public_id, url } = await this.cloudinaryService.uploadFile(
        file,
        'baza_skill',
      );
      return this.postsService.update(+id, updatePostDto, public_id, url);
    }
    return this.postsService.update(+id, updatePostDto);
  }

  //delete post
  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  // @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const res = await this.postsService.remove(+id);
    await this.cloudinaryService.deleteFile(res.post.image_id);
    return res;
  }
}
