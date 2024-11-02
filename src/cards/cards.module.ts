import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), CloudinaryModule],
  controllers: [CardsController],
  providers: [CardsService, CloudinaryService],
})
export class CardsModule {}
