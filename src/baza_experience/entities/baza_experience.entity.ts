import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Specialization } from 'src/specialization/entities/specialization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('baza_experience')
export class BazaExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Specialization, { onDelete: 'CASCADE' })
  @JoinColumn()
  specialization: Specialization;

  @Column()
  project_name: string;

  @Column()
  project_duration: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.baza_experience, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_id' })
  candidate_id: Candidate;
}
