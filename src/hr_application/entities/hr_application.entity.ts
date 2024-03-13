import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'HrApplication' })
export class HrApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'HR`s first name' })
  @Column()
  first_name: string;

  @ApiProperty({ description: 'HR`s last name' })
  @Column()
  last_name: string;

  @ApiProperty({ description: 'HR`s phone number' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'HR`s email' })
  @Column()
  email: string;

  @ApiProperty({ description: 'company of HR' })
  @Column({ nullable: true })
  company: string;

  @ApiProperty({ description: 'country of HR' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ description: 'specializtion' })
  @Column()
  specialization: string;

  @ApiProperty({ description: 'message' })
  @Column()
  message: string;
}
