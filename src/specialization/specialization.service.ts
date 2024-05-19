import { Specialization } from 'src/specialization/entities/specialization.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(Specialization)
    public readonly specializtionRepository: Repository<Specialization>,
  ) {}

  async create(createFunctionDto: CreateSpecializationDto) {
    const func = await this.specializtionRepository.findOne({
      where: { title: createFunctionDto.title },
    });
    if (func) {
      return new ForbiddenException(
        `Funсtion ${createFunctionDto.title} already exist`,
      );
    }
    return await this.specializtionRepository.save(createFunctionDto);
  }

  async findAll() {
    return await this.specializtionRepository.find({});
  }

  async findAllWithStack() {
    const result = await this.specializtionRepository.find({
      order: {
        id: 'DESC',
      },
      relations: {
        specialization_id: {
          stack_id: true,
        },
      },
    });
    const formatResult = result.map(({ id, title, specialization_id }) => {
      return {
        id,
        title,
        stack: specialization_id.map(({ stack_id, id }) => ({
          id: stack_id.id,
          specialization_stack_id: id,
          title: stack_id.title,
        })),
      };
    });
    return formatResult;
  }

  async findOne(id: number) {
    return (await this.specializtionRepository.findOne({ where: { id } }))
      ? await this.specializtionRepository.findOne({ where: { id } })
      : new NotFoundException('Function not found');
  }

  async update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    const func = await this.specializtionRepository.findOne({ where: { id } });
    if (!func) return new NotFoundException('Function not found');
    await this.specializtionRepository.update(id, updateSpecializationDto);
    return await this.specializtionRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    const func = this.specializtionRepository.findOne({ where: { id } });
    if (!func) return new NotFoundException('Function not found');
    this.specializtionRepository.delete(id);
    return { success: true };
  }
}
