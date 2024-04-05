
import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { CandidateLanguage } from 'src/candidate_languages/entities/candidate_language.entity';
import { CandidateStack } from 'src/candidate_stack/entities/candidate_stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, CandidateLanguage, CandidateStack])],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
