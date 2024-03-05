import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Testimonials' })
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Reviewer`s name in ukrainian' })
  @Column()
  name_ua: string;

  @ApiProperty({ description: 'Reviewer`s name in english' })
  @Column()
  name_en: string;

  @ApiProperty({ description: 'Reviewer`s name in english' })
  @Column()
  name_pl: string;

  @ApiProperty({ description: 'Reviewer`s position' })
  @Column()
  position: string;

  @ApiProperty({ description: 'Date of review' })
  @Column()
  date: string;

  @ApiProperty({ description: 'Image of reviewer' })
  @Column()
  image_url: string;

  @ApiProperty({ description: 'Cloudinary public id' })
  @Column()
  image_id: string;

  @ApiProperty({ description: 'Reviewer`s name  in polish' })
  @Column()
  review_ua: string;

  @ApiProperty({ description: 'Review text in english' })
  @Column()
  review_en: string;

  @ApiProperty({ description: 'Review text in polish' })
  @Column()
  review_pl: string;

  @CreateDateColumn()
  createdAt: Date;
}
