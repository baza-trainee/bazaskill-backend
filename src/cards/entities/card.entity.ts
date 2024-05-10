import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Card' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nae of user' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Specialization of user' })
  @Column()
  specialization: string;

  @ApiProperty({ description: 'Url of the image' })
  @Column()
  image_url: string;

  @ApiProperty({ description: 'cloudinary public id of the image' })
  @Column()
  image_id: string;

  @CreateDateColumn()
  createdAt: Date;
}
