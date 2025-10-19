import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClubStaffService } from './club-staff.service';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';

@Controller('club-staff')
export class ClubStaffController {
  constructor(private readonly clubStaffService: ClubStaffService) {}

  @Post()
  create(@Body() createClubStaffDto: CreateClubStaffDto) {
    return this.clubStaffService.create(createClubStaffDto);
  }

  @Get()
  findAll() {
    return this.clubStaffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubStaffService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubStaffDto: UpdateClubStaffDto) {
    return this.clubStaffService.update(id, updateClubStaffDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clubStaffService.remove(id);
  }
}
