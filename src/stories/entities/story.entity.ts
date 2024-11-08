import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Story' })
export class StoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_ua: string;

  @Column()
  name_en: string;

  @Column()
  name_pl: string;

  @Column()
  text_ua: string;

  @Column()
  text_en: string;

  @Column()
  text_pl: string;

  @Column()
  speciality: string;

  @Column()
  image_url: string;

  @Column()
  image_id: string;

  @Column()
  date: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
