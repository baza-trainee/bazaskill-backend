import { ApiProperty } from '@nestjs/swagger';
import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialization')
export class Specialization {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description:
      'Function which candidate execute on project such as PM or frontend etc',
  })
  @Column()
  title: string;

  @OneToMany(
    () => SpecializationStack,
    (specialization) => specialization.specialization_id,
  )
  specialization_id: SpecializationStack[];
}
