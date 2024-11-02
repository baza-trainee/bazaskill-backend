import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stack' })
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => SpecializationStack,
    (specialization) => specialization.stack_id,
  )
  stack_specialization_id: SpecializationStack[];
}
