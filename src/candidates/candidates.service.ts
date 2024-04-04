import { Candidate } from './entities/candidate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Repository } from 'typeorm';
import { CandidateGraduate } from 'src/candidate_graduate/entities/candidate_graduate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ){}
  async create(createCandidateDto: CreateCandidateDto) { 
    // const {graduate} = createCandidateDto
    const candidate = await this.candidateRepository.save(createCandidateDto); 
    // graduate.forEach(async (item)=>{
    //   await this.candidateGraduateRepository.save({...item, candidate_id: candidate})
    // }) 
    // console.log(graduate) 
    return candidate  
  }
 
  findAll() {
    return this.candidateRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return this.candidateRepository.delete(id);
  }
}
