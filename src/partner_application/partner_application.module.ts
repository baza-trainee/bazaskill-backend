import { Module } from '@nestjs/common';
import { PartnerApplicationService } from './partner_application.service';
import { PartnerApplicationController } from './partner_application.controller';
import { PartnerApplication } from './entities/partner_application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerApplication])],
  controllers: [PartnerApplicationController],
  providers: [PartnerApplicationService],
})
export class PartnerApplicationModule {}
