import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { ClubStaffService } from './club-staff.service';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';
import { ClubStaff } from './entities/club-staff.entity';

@ApiTags('Club Staff')
@Controller('clubStaff')
export class ClubStaffController {
  constructor(private readonly clubStaffService: ClubStaffService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClubStaff(
    @Body() createClubStaffDto: CreateClubStaffDto,
  ): Promise<ClubStaff> {
    return this.clubStaffService.createClubStaff(createClubStaffDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getClubStaffs(): Promise<ClubStaff[]> {
    return this.clubStaffService.getClubStaffs();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClubStaff(@Param('id') id: UUID): Promise<ClubStaff> {
    return this.clubStaffService.getClubStaff(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClubStaff(
    @Param('id') id: UUID,
    @Body() updateClubStaffDto: UpdateClubStaffDto,
  ): Promise<ClubStaff> {
    return this.clubStaffService.updateClubStaff(id, updateClubStaffDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeClubStaff(@Param('id') id: UUID): Promise<ClubStaff> {
    return this.clubStaffService.removeClubStaff(id);
  }
}
