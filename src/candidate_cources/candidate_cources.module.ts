import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidateCourcesService } from './candidate_cources.service';
import { CandidateCourcesController } from './candidate_cources.controller';
import { CandidateCource } from './entities/candidate_cource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateCource])],
  controllers: [CandidateCourcesController],
  providers: [CandidateCourcesService],
})
export class CandidateCourcesModule {}
