import { Module } from '@nestjs/common';
import { HrApplicationService } from './hr_application.service';
import { HrApplicationController } from './hr_application.controller';
import { HrApplication } from './entities/hr_application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HrApplication])],
  controllers: [HrApplicationController],
  providers: [HrApplicationService],
})
export class HrApplicationModule {}
