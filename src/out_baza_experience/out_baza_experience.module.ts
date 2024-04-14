import { Module } from '@nestjs/common';
import { OutBazaExperienceService } from './out_baza_experience.service';
import { OutBazaExperienceController } from './out_baza_experience.controller';

@Module({
  controllers: [OutBazaExperienceController],
  providers: [OutBazaExperienceService],
})
export class OutBazaExperienceModule {}
