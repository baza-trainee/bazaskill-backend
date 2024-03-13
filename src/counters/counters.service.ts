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
      if (counter) throw new NotFoundException('This counter is not found');
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
      const review = await this.CounterRepository.findOne({
        where: { id },
      });
      if (!review) throw new NotFoundException('This counter not found');
      await this.CounterRepository.update(id, updateCounterDto);
      return { success: true };
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
      await this.CounterRepository.delete(id);
      return { success: true, counter };
    } catch (error) {
      throw new HttpException(
        'Server Error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
