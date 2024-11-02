import { Injectable } from '@nestjs/common';
import { CreateCandidateStackDto } from './dto/create-candidate_stack.dto';
import { UpdateCandidateStackDto } from './dto/update-candidate_stack.dto';

@Injectable()
export class CandidateStackService {
  create(createCandidateStackDto: CreateCandidateStackDto) {
    return 'This action adds a new candidateStack';
  }

  findAll() {
    return `This action returns all candidateStack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidateStack`;
  }

  update(id: number, updateCandidateStackDto: UpdateCandidateStackDto) {
    return `This action updates a #${id} candidateStack`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidateStack`;
  }
}
