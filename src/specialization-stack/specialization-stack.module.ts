import { SpecializationStack } from './entities/specialization-stack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SpecializationStackService } from './specialization-stack.service';
import { SpecializationStackController } from './specialization-stack.controller';
import { Stack } from 'src/stack/entities/stack.entity';
import { Specialization } from 'src/specialization/entities/specialization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpecializationStack, Stack, Specialization])],
  controllers: [SpecializationStackController],
  providers: [SpecializationStackService],
})
export class SpecializationStackModule {}
