import { Module } from '@nestjs/common';
import { ClubStaffService } from './club-staff.service';
import { ClubStaffController } from './club-staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubStaff } from './entities/club-staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClubStaff])],
  controllers: [ClubStaffController],
  providers: [ClubStaffService],
})
export class ClubStaffModule {}
