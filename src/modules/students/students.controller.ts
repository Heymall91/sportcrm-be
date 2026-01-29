import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Auth0Guard } from '../auth/guard/authGuard';

@ApiTags('students')
@ApiBearerAuth()
@UseGuards(Auth0Guard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({
    status: 201,
    description: 'Student successfully created',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @Request() req,
  ): Promise<Student> {
    return this.studentsService.create(createStudentDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students created by current user' })
  @ApiResponse({
    status: 200,
    description: 'List of students',
    type: [Student],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Request() req): Promise<Student[]> {
    return this.studentsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Student found',
    type: Student,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Access denied' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Student> {
    return this.studentsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiParam({ name: 'id', description: 'Student ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Student successfully updated',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Access denied' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Request() req,
  ): Promise<Student> {
    return this.studentsService.update(id, updateStudentDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a student (soft delete)' })
  @ApiParam({ name: 'id', description: 'Student ID', type: String })
  @ApiResponse({
    status: 204,
    description: 'Student successfully deleted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Access denied' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(
    @Param('id') id: string,
    @Request() req,
  ): Promise<void> {
    return this.studentsService.remove(id, req.user.id);
  }
}