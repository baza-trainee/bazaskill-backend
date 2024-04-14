import { Injectable } from '@nestjs/common';
import { CreateOutBazaExperienceDto } from './dto/create-out_baza_experience.dto';
import { UpdateOutBazaExperienceDto } from './dto/update-out_baza_experience.dto';

@Injectable()
export class OutBazaExperienceService {
  create(createOutBazaExperienceDto: CreateOutBazaExperienceDto) {
    return 'This action adds a new outBazaExperience';
  }

  findAll() {
    return `This action returns all outBazaExperience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} outBazaExperience`;
  }

  update(id: number, updateOutBazaExperienceDto: UpdateOutBazaExperienceDto) {
    return `This action updates a #${id} outBazaExperience`;
  }

  remove(id: number) {
    return `This action removes a #${id} outBazaExperience`;
  }
}
