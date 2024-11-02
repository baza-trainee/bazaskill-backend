import { Candidate } from 'src/candidates/entities/candidate.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('candidate_cources')
export class CandidateCource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cources_name: string;

  @Column()
  cources_sertificate: string;

  @Column()
  cources_sertificate_id: string;

  @Column()
  cources_specializaton: string;

  @Column()
  cources_start: string;

  @Column()
  cources_end: string;

  @ManyToOne(() => Candidate, (candidate) => candidate.cources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidate_id' })
  candidate_id: Candidate;
}
