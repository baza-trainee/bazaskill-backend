import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BazaExperienceService } from './baza_experience.service';
import { BazaExperienceController } from './baza_experience.controller';
import { BazaExperience } from './entities/baza_experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BazaExperience])],
  controllers: [BazaExperienceController],
  providers: [BazaExperienceService],
})
export class BazaExperienceModule {}
