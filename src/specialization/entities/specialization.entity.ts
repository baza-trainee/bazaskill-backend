import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialization')
export class Specialization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => SpecializationStack,
    (specialization) => specialization.specialization_id,
  )
  specialization_id: SpecializationStack[];
}
