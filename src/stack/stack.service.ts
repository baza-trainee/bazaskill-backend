import { Repository } from 'typeorm';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { Stack } from './entities/stack.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';
import { Specialization } from 'src/specialization/entities/specialization.entity';

@Injectable()
export class StackService {
  constructor(
    @InjectRepository(Stack)
    private readonly stackRepository: Repository<Stack>,
    @InjectRepository(SpecializationStack)
    private readonly specializationStackRepository: Repository<SpecializationStack>,
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {}

  async create(createStackDto: CreateStackDto) {
    try {
      const stack = await this.stackRepository.findOne({
        where: { title: createStackDto.title },
      });

      if (stack) {
        throw new ConflictException(
          `Stack ${createStackDto.title} already exists`,
        );
      }

      const specialization = await this.specializationRepository.findOne({
        where: {
          id: +createStackDto.specialization_id,
        },
      });

      if (!specialization) {
        throw new Error('Specialization not found');
      }

      const newStack = this.stackRepository.create(createStackDto);
      await this.stackRepository.save(newStack);

      const specializationStack = new SpecializationStack();
      specializationStack.specialization_id = specialization;
      specializationStack.stack_id = newStack;

      await this.specializationStackRepository.save(specializationStack);

      return newStack;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create stack');
    }
  }

  findAll() {
    return this.stackRepository.find({
      relations: {
        stack_specialization_id: true,
      },
    });
  }

  async findOne(id: number) {
    return (await this.stackRepository.findOne({ where: { id } }))
      ? await this.stackRepository.findOne({ where: { id } })
      : new ForbiddenException('Stack not found');
  }

  async update(id: number, updateStackDto: UpdateStackDto) {
    const stack = await this.stackRepository.findOne({ where: { id } });
    if (!stack) {
      return new ForbiddenException('Stack not found');
    }
    await this.stackRepository.update(id, updateStackDto);
    return await this.stackRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.stackRepository.delete(id);
  }
}
