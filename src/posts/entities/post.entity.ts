import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Title of the post in ukrainian' })
  @Column()
  title_ua: string;

  @ApiProperty({ description: 'Title of the post in english' })
  @Column()
  title_en: string;

  @ApiProperty({ description: 'Title of the post in polish' })
  @Column()
  title_pl: string;

  @ApiProperty({ description: 'Content of the post in ukrainian' })
  @Column()
  text_ua: string;

  @ApiProperty({ description: 'Content of the post in english' })
  @Column()
  text_en: string;

  @ApiProperty({ description: 'Content of the post in polish' })
  @Column()
  text_pl: string;

  @ApiProperty({ description: 'Link to the Linkedin post' })
  @Column()
  link: string;

  @ApiProperty({ description: 'Url of the image' })
  @Column()
  image_url: string;

  @ApiProperty({ description: 'Cloudinary public id of the image' })
  @Column()
  image_id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
