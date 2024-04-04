import { Injectable } from '@nestjs/common';
import { CreateBazaExperienceDto } from './dto/create-baza_experience.dto';
import { UpdateBazaExperienceDto } from './dto/update-baza_experience.dto';

@Injectable()
export class BazaExperienceService {
  create(createBazaExperienceDto: CreateBazaExperienceDto) {
    return 'This action adds a new bazaExperience';
  }

  findAll() {
    return `This action returns all bazaExperience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bazaExperience`;
  }

  update(id: number, updateBazaExperienceDto: UpdateBazaExperienceDto) {
    return `This action updates a #${id} bazaExperience`;
  }

  remove(id: number) {
    return `This action removes a #${id} bazaExperience`;
  }
}
