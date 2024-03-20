import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountersService {
  constructor(
    @InjectRepository(Counter)
    private readonly CounterRepository: Repository<Counter>,
  ) {}

  async create(createCounterDto: CreateCounterDto) {
    await this.CounterRepository.save(createCounterDto);
    return { message: 'Counter successfully created' };
  }

  async findAll() {
    try {
      const counters = await this.CounterRepository.find({});
      return counters;
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const counter = await this.CounterRepository.findOne({
        where: { id },
      });
      if (!counter) throw new NotFoundException('This counter is not found');
      return counter;
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCounterDto: UpdateCounterDto) {
    try {
      const counter = await this.CounterRepository.findOne({
        where: { id },
      });
      if (!counter) throw new NotFoundException('This counter not found');
      const updatedCounter = await this.CounterRepository.update(
        id,
        updateCounterDto,
      );
      return { message: 'Counter successfully updated', updatedCounter };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const counter = await this.CounterRepository.findOne({
        where: { id },
      });
      if (!counter) throw new NotFoundException('This counter not found');
      await this.CounterRepository.delete(id);
      return { message: 'Counter successfully deleted' };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
