import { CandidateCource } from './../../candidate_cources/entities/candidate_cource.entity';
import { Specialization } from 'src/specialization/entities/specialization.entity';
import { CandidateLanguage } from 'src/candidate_languages/entities/candidate_language.entity';
import { CandidateStack } from 'src/candidate_stack/entities/candidate_stack.entity';
import { CandidateGraduate } from 'src/candidate_graduate/entities/candidate_graduate.entity';
import { BazaExperience } from 'src/baza_experience/entities/baza_experience.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('candidate')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_ua: string;

  @Column()
  surname_ua: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  about: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  linkedin: string;

  @Column()
  discord: string;

  @Column()
  telegram: string;

  @OneToMany(() => CandidateLanguage, (language) => language.candidate_id)
  candidate_language: CandidateLanguage[];

  @Column()
  work_format: string;

  @Column()
  sallary_form: string;

  @Column()
  sallary_to: string;

  // //need to implement manyToOne with entity specialization
  @ManyToOne(() => Specialization)
  @JoinColumn()
  specialization: Specialization;

  @Column()
  cv: string;

  @Column()
  cv_id: string;

  //need to implement oneToMany with entity candidate_stack
  @OneToMany(() => CandidateStack, (stack) => stack.candidate_id)
  stack: CandidateStack[];

  // //need to implement oneToMany with entity candidate_graduate and entity graduate
  @OneToMany(() => CandidateGraduate, (graduate) => graduate.candidate_id)
  gradaute: CandidateGraduate[];

  // //need to implement oneToMany with entity candidate_cources and entity cources
  @OneToMany(() => CandidateCource, (course) => course.candidate_id)
  cources: CandidateCource[];

  // // //need to implement oneToMany with entity candidate_baza_experience and entity baza_experience
  @OneToMany(
    () => BazaExperience,
    (baza_experience) => baza_experience.candidate_id,
  )
  baza_experience: BazaExperience[];

  @Column()
  baza_recomendation: string;

  @Column()
  status: string; //working, searching, inactive

  @Column()
  uniqueId: string;

  @Column()
  isPublished: boolean;
}
