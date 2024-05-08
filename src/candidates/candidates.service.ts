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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCandidateDto: CreateCandidateDto) {
    try {
      const { candidate_language, stack, gradaute, cources, baza_experience } =
        createCandidateDto;

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
      },
    });
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const { candidate_language, stack, gradaute, cources, baza_experience } =
      updateCandidateDto;

    const foundCandidate = await this.candidateRepository.findOne({
      where: { id },
    });
    if (!foundCandidate) {
      throw new NotFoundException('Candidate not found');
    }

    try {
      await this.removeFromDb(id);

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

  async removeFromDb(id: number) {
    const candidate = this.findOne(id);
    if (!candidate) throw new NotFoundException('Candidate not found');
    await this.candidateRepository.delete(id);
    return { message: 'candidate successfully deleted' };
  }

  async remove(id: number) {
    const candidate = this.findOne(id);
    if (!candidate) throw new NotFoundException('Candidate not found');
    const public_ids = [];
    public_ids.push((await candidate).cv_id);
    (await candidate).cources.map((cource) => {
      public_ids.push(cource.cources_sertificate_id);
    });
    (await candidate).gradaute.map((item) => {
      public_ids.push(item.graduate_sertificate_id);
    });
    await this.candidateRepository.delete(id);
    await this.cloudinaryService.deleteFiles(
      public_ids.filter((id) => id !== ''),
    );
    return { message: 'candidate successfully deleted' };
  }
}
