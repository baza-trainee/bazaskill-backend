import { Injectable } from '@nestjs/common';
import { CreateCandidateGraduateDto } from './dto/create-candidate_graduate.dto';
import { UpdateCandidateGraduateDto } from './dto/update-candidate_graduate.dto';

@Injectable()
export class CandidateGraduateService {
  create(createCandidateGraduateDto: CreateCandidateGraduateDto) {
    return 'This action adds a new candidateGraduate';
  }

  findAll() {
    return `This action returns all candidateGraduate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidateGraduate`;
  }

  update(id: number, updateCandidateGraduateDto: UpdateCandidateGraduateDto) {
    return `This action updates a #${id} candidateGraduate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidateGraduate`;
  }
}
