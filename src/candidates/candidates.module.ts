import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { CandidateLanguage } from '../candidate_languages/entities/candidate_language.entity';
import { CandidateStack } from 'src/candidate_stack/entities/candidate_stack.entity';
import { CandidateGraduate } from '../candidate_graduate/entities/candidate_graduate.entity';
import { CandidateCource } from '../candidate_cources/entities/candidate_cource.entity';
import { BazaExperience } from '../baza_experience/entities/baza_experience.entity';
import { OutBazaExperience } from '../out_baza_experience/entities/out_baza_experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Candidate,
      CandidateLanguage,
      CandidateStack,
      CandidateGraduate,
      CandidateCource,
      BazaExperience,
      OutBazaExperience,
    ]),
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}