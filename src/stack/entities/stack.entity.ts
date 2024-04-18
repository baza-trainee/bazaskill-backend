import { ApiProperty } from '@nestjs/swagger';
import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stack' })
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'title of stack technology such as HTML/CSS' })
  @Column()
  title: string;

  @OneToMany(
    () => SpecializationStack,
    (specialization) => specialization.stack_id,
  )
  stack_specialization_id: SpecializationStack[];
}
