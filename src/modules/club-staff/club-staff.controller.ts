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
import { ClubStaffService } from './club-staff.service';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';
import { ClubStaff } from './entities/club-staff.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('club-staff')
export class ClubStaffController {
  constructor(private readonly clubStaffService: ClubStaffService) {}

  @Post()
  @ApiOperation({ summary: 'Create the club staff relation' })
  @ApiBody({ type: CreateClubStaffDto })
  @ApiResponse({ status: 200, description: 'Realtion has been created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createClubStaffDto: CreateClubStaffDto): Promise<ClubStaff> {
    return this.clubStaffService.create(createClubStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all club staff relations' })
  @ApiResponse({ status: 200, type: [CreateClubStaffDto] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Relations not found' })
  findAll(): Promise<ClubStaff[]> {
    return this.clubStaffService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find club staff relation by ID' })
  @ApiParam({
    name: 'id',
    description: 'Club staff identificator',
    example: '6505ad1f-03d0-43b7-9d85-44404f7cdbf2',
  })
  @ApiResponse({ status: 200, description: 'Club staff' })
  @ApiResponse({ status: 404, description: "Relation doesn't exist" })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CreateClubStaffDto> {
    const clubStaff = await this.clubStaffService.findOne(id);
    return plainToInstance(CreateClubStaffDto, clubStaff);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update club staff relation by ID' })
  @ApiParam({
    name: 'id',
    description: 'Club staff identificator',
    example: '6505ad1f-03d0-43b7-9d85-44404f7cdbf2',
  })
  @ApiResponse({
    status: 200,
    description: 'Club staff updated',
    type: CreateClubStaffDto,
  })
  @ApiResponse({ status: 404, description: "Relation doesn't exist" })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClubStaffDto: UpdateClubStaffDto,
  ): Promise<UpdateClubStaffDto> {
    const updatedClubStaffDto = await this.clubStaffService.update(
      id,
      updateClubStaffDto,
    );
    return plainToInstance(UpdateClubStaffDto, updatedClubStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleting club staff by ID' })
  @ApiParam({
    name: 'id',
    description: 'Club staff identificator',
    example: 'c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba',
  })
  @ApiResponse({ status: 204, description: 'Club staff deleted' })
  @ApiResponse({ status: 404, description: 'Club staff not found' })
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.clubStaffService.delete(id);
  }
}
