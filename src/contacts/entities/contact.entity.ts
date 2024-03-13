import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Contacts' })
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'first phone number' })
  @Column()
  phone_1: string;

  @ApiProperty({ description: 'second phone number' })
  @Column()
  phone_2: string;

  @ApiProperty({ description: 'email address' })
  @Column()
  email: string;

  @ApiProperty({ description: 'link to telegram' })
  @Column()
  telegram: string;

  @ApiProperty({ description: 'link to linkedin' })
  @Column()
  linkedin: string;

  @ApiProperty({ description: 'link to discord' })
  @Column()
  discord: string;

  @ApiProperty({ description: 'link to facebook' })
  @Column()
  facebook: string;

  @ApiProperty({ description: 'link to instagram' })
  @Column()
  instagram: string;
}
