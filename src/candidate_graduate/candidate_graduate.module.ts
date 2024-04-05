import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidateGraduateService } from './candidate_graduate.service';
import { CandidateGraduateController } from './candidate_graduate.controller';
import { CandidateGraduate } from './entities/candidate_graduate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateGraduate])],
  controllers: [CandidateGraduateController],
  providers: [CandidateGraduateService],
})
export class CandidateGraduateModule {}
