import { Candidate } from './entities/candidate.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Repository } from 'typeorm';
import { CandidateLanguage } from 'src/candidate_languages/entities/candidate_language.entity';
import { CandidateStack } from 'src/candidate_stack/entities/candidate_stack.entity';
import { CandidateGraduate } from 'src/candidate_graduate/entities/candidate_graduate.entity';
import { CandidateCource } from 'src/candidate_cources/entities/candidate_cource.entity';
import { BazaExperience } from 'src/baza_experience/entities/baza_experience.entity';
import { OutBazaExperience } from 'src/out_baza_experience/entities/out_baza_experience.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    @InjectRepository(CandidateLanguage)
    private readonly candidateLanguageRepository: Repository<CandidateLanguage>,
    @InjectRepository(CandidateStack)
    private readonly candidateStackRepository: Repository<CandidateStack>,
    @InjectRepository(CandidateGraduate)
    private readonly candidateGraduateRepository: Repository<CandidateGraduate>,
    @InjectRepository(CandidateCource)
    private readonly candidateCourceRepository: Repository<CandidateCource>,
    @InjectRepository(BazaExperience)
    private readonly bazaExperienceRepository: Repository<BazaExperience>,
    @InjectRepository(OutBazaExperience)
    private readonly outBazaExperienceRepository: Repository<OutBazaExperience>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto) {
    try {
      const {
        candidate_language,
        stack,
        gradaute,
        cources,
        baza_experience,
        out_baza_experience,
      } = createCandidateDto;

      const candidate = await this.candidateRepository.save(createCandidateDto);

      candidate_language.forEach(async (item) => {
        await this.candidateLanguageRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      cources.forEach(async (item) => {
        await this.candidateCourceRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      gradaute.forEach(async (item) => {
        await this.candidateGraduateRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      baza_experience.forEach(async (item) => {
        await this.bazaExperienceRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      out_baza_experience.forEach(async (item) => {
        await this.outBazaExperienceRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      stack.forEach(async (item) => {
        await this.candidateStackRepository.save({
          stack: item,
          candidate_id: candidate,
        });
      });

      return candidate;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.candidateRepository.find({
      relations: {
        specialization: true,
        candidate_language: true,
        stack: {
          stack: true,
        },
        gradaute: true,
        cources: true,
        baza_experience: {
          specialization: true, // Include specialization relation from BazaExperience
          candidate_id: true, // Include candidate_id relation from BazaExperience
        },
        out_baza_experience: true,
      },
    });
  }

  findOne(id: number) {
    return this.candidateRepository.findOne({
      where: { id },
      relations: {
        specialization: true,
        candidate_language: true,
        stack: {
          stack: true,
        },
        gradaute: true,
        cources: true,
        baza_experience: {
          specialization: true, // Include specialization relation from BazaExperience
          candidate_id: true, // Include candidate_id relation from BazaExperience
        },
        out_baza_experience: true,
      },
    });
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const {
      candidate_language,
      stack,
      gradaute,
      cources,
      baza_experience,
      out_baza_experience,
    } = updateCandidateDto;

    const foundCandidate = await this.candidateRepository.findOne({
      where: { id },
    });
    if (!foundCandidate) {
      throw new NotFoundException('Candidate not found');
    }

    try {
      await this.candidateRepository.delete(id);

      const candidate = await this.candidateRepository.save(updateCandidateDto);

      candidate_language.forEach(async (item) => {
        await this.candidateLanguageRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      cources.forEach(async (item) => {
        await this.candidateCourceRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      gradaute.forEach(async (item) => {
        await this.candidateGraduateRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      baza_experience.forEach(async (item) => {
        await this.bazaExperienceRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      out_baza_experience.forEach(async (item) => {
        await this.outBazaExperienceRepository.save({
          ...item,
          candidate_id: candidate,
        });
      });

      stack.forEach(async (item) => {
        await this.candidateStackRepository.save({
          stack: item,
          candidate_id: candidate,
        });
      });

      return candidate;
    } catch (error) {
      console.error('Failed to update candidate language:', error);
      throw new Error('Failed to update candidate language');
    }
  }

  async remove(id: number) {
    const candidate = this.candidateRepository.findOne({
      where: { id },
    });
    if (!candidate) throw new NotFoundException('Candidate not found');
    await this.candidateRepository.delete(id);
    return { message: 'candidate successfully deleted' };
  }
}
