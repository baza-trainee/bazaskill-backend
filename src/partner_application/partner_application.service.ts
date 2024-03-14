import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerApplicationDto } from './dto/create-partner_application.dto';
import { UpdatePartnerApplicationDto } from './dto/update-partner_application.dto';
import { PartnerApplication } from './entities/partner_application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerApplicationService {
  constructor(
    @InjectRepository(PartnerApplication)
    private readonly partnerApplicationRepository: Repository<PartnerApplication>,
  ) {}

  async create(createPartnerApplicationDto: CreatePartnerApplicationDto) {
    const partner = await this.partnerApplicationRepository.save(
      createPartnerApplicationDto,
    );
    return { message: 'partner application was successfully added', partner };
  }

  findAll() {
    return this.partnerApplicationRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.partnerApplicationRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePartnerApplicationDto: UpdatePartnerApplicationDto,
  ) {
    const partner = await this.partnerApplicationRepository.findOne({
      where: { id },
    });
    if (partner) throw new NotFoundException('This.partner not found');

    const updatedHr = await this.partnerApplicationRepository.update(
      id,
      updatePartnerApplicationDto,
    );
    return { message: 'application was successfully updated', updatedHr };
  }

  async remove(id: number) {
    const partner = await this.partnerApplicationRepository.findOne({
      where: { id },
    });
    if (partner) throw new NotFoundException('This.partner not found');
    await this.partnerApplicationRepository.delete(id);
    return { message: 'application was successfully deleted' };
  }
}
