import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHrApplicationDto } from './dto/create-hr_application.dto';
import { UpdateHrApplicationDto } from './dto/update-hr_application.dto';
import { HrApplication } from './entities/hr_application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HrApplicationService {
  constructor(
    @InjectRepository(HrApplication)
    private readonly hrApplicationRepository: Repository<HrApplication>,
  ) {}

  async create(createHrApplicationDto: CreateHrApplicationDto) {
    const hr = await this.hrApplicationRepository.save(createHrApplicationDto);
    return { message: 'HR application was successfully added', hr };
  }

  findAll() {
    return this.hrApplicationRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.hrApplicationRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateHrApplicationDto: UpdateHrApplicationDto) {
    const hr = await this.hrApplicationRepository.findOne({
      where: { id },
    });
    if (!hr) throw new NotFoundException('This hr not found');

    const updatedHr = await this.hrApplicationRepository.update(
      id,
      updateHrApplicationDto,
    );
    return { message: 'application was successfully updated', updatedHr };
  }

  async remove(id: number) {
    const hr = await this.hrApplicationRepository.findOne({
      where: { id },
    });
    if (!hr) throw new NotFoundException('This hr not found');
    await this.hrApplicationRepository.delete(id);
    return { message: 'application was successfully deleted' };
  }
}
