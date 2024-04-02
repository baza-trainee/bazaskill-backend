import { Injectable } from '@nestjs/common';
import { CreateCandidateCourceDto } from './dto/create-candidate_cource.dto';
import { UpdateCandidateCourceDto } from './dto/update-candidate_cource.dto';

@Injectable()
export class CandidateCourcesService {
  create(createCandidateCourceDto: CreateCandidateCourceDto) {
    return 'This action adds a new candidateCource';
  }

  findAll() {
    return `This action returns all candidateCources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidateCource`;
  }

  update(id: number, updateCandidateCourceDto: UpdateCandidateCourceDto) {
    return `This action updates a #${id} candidateCource`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidateCource`;
  }
}
