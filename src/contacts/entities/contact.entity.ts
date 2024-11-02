import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Contacts' })
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_1: string;

  @Column()
  phone_2: string;

  @Column()
  email: string;

  @Column()
  telegram: string;

  @Column()
  linkedin: string;

  @Column()
  discord: string;

  @Column()
  facebook: string;

  @Column()
  instagram: string;
}
