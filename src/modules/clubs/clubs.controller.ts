import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Club } from './entities/club.entity';
import { plainToInstance } from 'class-transformer';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new club' })
  @ApiBody({ type: CreateClubDto })
  @ApiResponse({ status: 200, description: 'Club has been created' })
  @ApiResponse({ status: 503, description: 'Bad request' })
  create(@Body() createClubDto: CreateClubDto): Promise<Club> {
    return this.clubsService.create(createClubDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all clubs' })
  @ApiResponse({ status: 200, type: [CreateClubDto] })
  @ApiResponse({ status: 404, description: 'Clubs not found' })
  findAll(): Promise<Club[]> {
    return this.clubsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get club by ID' })
  @ApiParam({
    name: 'id',
    description: 'Club identificator',
    example: 'f87fe938-df16-4c77-919e-6d31d06690f0',
  })
  @ApiResponse({ status: 200, description: 'Club found', type: CreateClubDto })
  @ApiResponse({ status: 404, description: "Club doesn't found" })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CreateClubDto> {
    const club = await this.clubsService.findOne(id);
    return plainToInstance(CreateClubDto, club);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the club' })
  @ApiParam({
    name: 'id',
    description: 'Club identificator',
    example: 'f87fe938-df16-4c77-919e-6d31d06690f0',
  })
  @ApiResponse({
    status: 200,
    description: 'Club updated',
    type: CreateClubDto,
  })
  @ApiResponse({ status: 404, description: 'Update error' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClubDto: UpdateClubDto,
  ): Promise<UpdateClubDto> {
    const updatedClub = await this.clubsService.update(id, updateClubDto);
    return plainToInstance(UpdateClubDto, updatedClub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Club deleting' })
  @ApiParam({
    name: 'id',
    description: 'Club identificator',
    example: 'f87fe938-df16-4c77-919e-6d31d06690f0',
  })
  @ApiResponse({ status: 200, description: 'Club removed' })
  @ApiResponse({ status: 404, description: 'Removing failed' })
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.clubsService.delete(id);
  }
}
