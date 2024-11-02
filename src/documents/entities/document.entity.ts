import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Documents' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  document_url: string;

  @Column()
  document_id: string;

  @CreateDateColumn()
  createdAt: Date;
}
