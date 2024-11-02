import { Specialization } from 'src/specialization/entities/specialization.entity';
import { Stack } from 'src/stack/entities/stack.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialization-stack')
export class SpecializationStack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Specialization,
    (specialization) => specialization.specialization_id,
    { onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'specialization_id' })
  specialization_id: Specialization;

  @ManyToOne(() => Stack, (stack) => stack.stack_specialization_id, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'stack_id' })
  stack_id: Stack;
}
