import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidateLanguagesService } from './candidate_languages.service';
import { CandidateLanguagesController } from './candidate_languages.controller';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { CandidateLanguage } from './entities/candidate_language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateLanguage])],
  controllers: [CandidateLanguagesController],
  providers: [CandidateLanguagesService],
})
export class CandidateLanguagesModule {}
