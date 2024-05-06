import { Specialization } from 'src/specialization/entities/specialization.entity';
import { IsBoolean, IsString } from 'class-validator';
import { CandidateLanguage } from 'src/candidate_languages/entities/candidate_language.entity';
import { CandidateStack } from 'src/candidate_stack/entities/candidate_stack.entity';
import { CandidateGraduate } from 'src/candidate_graduate/entities/candidate_graduate.entity';
import { CandidateCource } from 'src/candidate_cources/entities/candidate_cource.entity';
import { BazaExperience } from 'src/baza_experience/entities/baza_experience.entity';

export class CreateCandidateDto {
  @IsString()
  name_ua: string;

  @IsString()
  surname_ua: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  about: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  linkedin: string;

  @IsString()
  discord: string;

  @IsString()
  telegram: string;

  candidate_language: CandidateLanguage[];

  @IsString()
  work_format: string;

  @IsString()
  sallary_form: string;

  @IsString()
  sallary_to: string;

  @IsString()
  specialization: Specialization;

  @IsString()
  cv: string;

  @IsString()
  cv_id: string;

  stack: CandidateStack[];

  gradaute: CandidateGraduate[];

  cources: CandidateCource[];

  baza_experience: BazaExperience[];

  @IsString()
  baza_recomendation: string;

  @IsString()
  status: string; //working, searching, inactive

  @IsString()
  uniqueId: string;

  @IsBoolean()
  isPublished: boolean;
}
