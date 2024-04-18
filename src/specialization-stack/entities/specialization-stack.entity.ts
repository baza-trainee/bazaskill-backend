import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from 'src/specialization/entities/specialization.entity';
import { Stack } from 'src/stack/entities/stack.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialization-stack')
export class SpecializationStack {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Function id where function PM or frontend etc' })
  @ManyToOne(
    () => Specialization,
    (specialization) => specialization.specialization_id,
    { onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'specialization_id' })
  specialization_id: Specialization;

  @ApiProperty({ description: 'Stack id where stack HTML/CSS or Figma etc' })
  @ManyToOne(() => Stack, (stack) => stack.stack_specialization_id, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'stack_id' })
  stack_id: Stack;
}
