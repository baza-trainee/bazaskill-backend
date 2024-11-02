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

  @Column()
  name_ua: string;

  @Column()
  name_en: string;

  @Column()
  name_pl: string;

  @Column()
  position: string;

  @Column()
  date: string;

  @Column()
  image_url: string;

  @Column()
  image_id: string;

  @Column()
  review_ua: string;

  @Column()
  review_en: string;

  @Column()
  review_pl: string;

  @CreateDateColumn()
  createdAt: Date;
}
