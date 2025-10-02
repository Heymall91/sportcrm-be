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

import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@ApiTags('Club')
@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClub(@Body() createClubDto: CreateClubDto): Promise<Club> {
    return this.clubService.createClub(createClubDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getClubs(): Promise<Club[]> {
    return this.clubService.getClubs();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClub(@Param('id') id: UUID): Promise<Club> {
    return this.clubService.getClub(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateClub(
    @Param('id') id: UUID,
    @Body() updateClubDto: UpdateClubDto,
  ): Promise<Club> {
    return this.clubService.updateClub(id, updateClubDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeClub(@Param('id') id: UUID): Promise<Club> {
    return this.clubService.removeClub(id);
  }
}
