import { Module } from '@nestjs/common';

import { ClubStaffService } from './club-staff.service';
import { ClubStaffController } from './club-staff.controller';
import { ClubStaffRepository } from './club-staff.repository';
import { clubStaffProviders } from './entities/club-staff.entity';

@Module({
  controllers: [ClubStaffController],
  providers: [ClubStaffService, ClubStaffRepository, ...clubStaffProviders],
  exports: [ClubStaffService],
})
export class ClubStaffModule {}
