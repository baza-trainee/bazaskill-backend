import { Injectable } from '@nestjs/common';
import { CreateCandidateLanguageDto } from './dto/create-candidate_language.dto';
import { UpdateCandidateLanguageDto } from './dto/update-candidate_language.dto';

@Injectable()
export class CandidateLanguagesService {
  create(createCandidateLanguageDto: CreateCandidateLanguageDto) {
    return 'This action adds a new candidateLanguage';
  }

  findAll() {
    return `This action returns all candidateLanguages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidateLanguage`;
  }

  update(id: number, updateCandidateLanguageDto: UpdateCandidateLanguageDto) {
    return `This action updates a #${id} candidateLanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidateLanguage`;
  }
}
