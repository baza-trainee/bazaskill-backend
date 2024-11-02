import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { StoryEntity } from './entities/story.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoryEntity])],
  controllers: [StoriesController],
  providers: [StoriesService, CloudinaryService],
})
export class StoriesModule {}
