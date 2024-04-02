import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidateStackService } from './candidate_stack.service';
import { CandidateStackController } from './candidate_stack.controller';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { CandidateStack } from './entities/candidate_stack.entity';
import { Stack } from 'src/stack/entities/stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, CandidateStack, Stack])],
  controllers: [CandidateStackController],
  providers: [CandidateStackService],
})
export class CandidateStackModule {}
