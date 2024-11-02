import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { Stack } from './entities/stack.entity';
import { Specialization } from 'src/specialization/entities/specialization.entity';
import { SpecializationStack } from 'src/specialization-stack/entities/specialization-stack.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stack, Specialization, SpecializationStack]),
  ],
  controllers: [StackController],
  providers: [StackService],
})
export class StackModule {}
