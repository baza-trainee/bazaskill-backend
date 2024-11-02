import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidateStackService } from './candidate_stack.service';
import { CandidateStackController } from './candidate_stack.controller';
import { CandidateStack } from './entities/candidate_stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateStack])],
  controllers: [CandidateStackController],
  providers: [CandidateStackService],
})
export class CandidateStackModule {}
