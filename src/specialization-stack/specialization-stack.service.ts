import { Specialization } from 'src/specialization/entities/specialization.entity';
import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecializationStackDto } from './dto/create-specialization-stack.dto';
import { UpdateSpecializationStackDto } from './dto/update-specialization-stack.dto';
import { Stack } from 'src/stack/entities/stack.entity';

@Injectable()
export class SpecializationStackService {
  constructor(
    @InjectRepository(SpecializationStack)
    private readonly specializationStackRepository: Repository<SpecializationStack>,
    @InjectRepository(Stack)
    private readonly stackRepository: Repository<Stack>,
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {}

  async create(createSpecializationStackDto: CreateSpecializationStackDto) {
    const stack = await this.stackRepository.findOne({
      where: { id: +createSpecializationStackDto.stack_id },
    });
    const func = await this.specializationRepository.findOne({
      where: { id: +createSpecializationStackDto.specialization_id },
    });
    const funcStack = await this.specializationStackRepository.findOne({
      where: {
        stack_id: {
          id: +createSpecializationStackDto.stack_id,
        },
        specialization_id: {
          id: +createSpecializationStackDto.specialization_id,
        },
      },
      relations: {
        stack_id: true,
        specialization_id: true,
      },
    });
    if (!stack || !func) {
      return new ForbiddenException('stack or function not exist');
    } else if (funcStack) {
      return new ForbiddenException(
        `stack: ${funcStack.stack_id.title} for function:${funcStack.specialization_id.title} already exist`,
      );
    }
    return this.specializationStackRepository.save(
      createSpecializationStackDto,
    );
  }

  async findAll() {
    return this.specializationStackRepository.find({
      relations: {
        stack_id: true,
        specialization_id: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} functionStack`;
  }

  update(id: number, updateFunctionStackDto: UpdateSpecializationStackDto) {
    return `This action updates a #${id} functionStack`;
  }

  remove(id: number) {
    return this.specializationStackRepository.delete(id);
  }
}
