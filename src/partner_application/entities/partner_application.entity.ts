import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'PartnerApplication' })
export class PartnerApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Partner`s company name' })
  @Column()
  company_name: string;

  @ApiProperty({ description: 'Partner`s company url' })
  @Column()
  company_url: string;

  @ApiProperty({ description: 'Partner`s phone number' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'Partner`s email' })
  @Column()
  email: string;

  @ApiProperty({ description: 'partners first name' })
  @Column()
  first_name: string;

  @ApiProperty({ description: 'partners last name' })
  @Column()
  last_name: string;

  @ApiProperty({ description: 'occupation' })
  @Column()
  occupation: string;

  @ApiProperty({ description: 'country' })
  @Column()
  country: string;

  @ApiProperty({ description: 'specializtion' })
  @Column()
  specialization: string;

  @ApiProperty({ description: 'message' })
  @Column()
  message: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
