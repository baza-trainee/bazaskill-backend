import { Candidate } from './entities/candidate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Repository } from 'typeorm';
import { CandidateLanguage } from 'src/candidate_languages/entities/candidate_language.entity';
import { CandidateStack } from 'src/candidate_stack/entities/candidate_stack.entity';
import { Stack } from 'src/stack/entities/stack.entity';
// import { CandidateGraduate } from 'src/candidate_graduate/entities/candidate_graduate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(CandidateLanguage)
    private readonly candidateLanguageRepository: Repository<CandidateLanguage>,
    @InjectRepository(CandidateStack)
    private readonly candidateStackRepository: Repository<CandidateStack>,
  ){}
  async create(createCandidateDto: CreateCandidateDto) { 
    const {candidate_language, stack} = createCandidateDto
    const candidate = await this.candidateRepository.save(createCandidateDto);
    candidate_language.forEach(async (item)=>{
      await this.candidateLanguageRepository.save({...item, candidate_id: candidate})
    })

    stack.forEach(async (item)=> {
      await this.candidateStackRepository.save({stack: item, candidate_id: candidate}) 
    }) 
    console.log(candidate_language) 
    return candidate  
  }
 
  findAll() {
    return this.candidateRepository.find({
      relations: {
        specialization: true,
        candidate_language: true,
        stack: {
          stack: true
        }
      },
    });
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
