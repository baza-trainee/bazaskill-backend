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
  title: string;

  @ApiProperty({ description: 'Content of the post in ukrainian' })
  @Column()
  text: string;

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
