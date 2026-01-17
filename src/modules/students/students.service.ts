import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
  @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto, creatorId: string) {
    const newStudent = this.studentsRepository.create({
      ...createStudentDto,
      createdById: creatorId
    });
    return this.studentsRepository.save(newStudent);
  }

  async findAll(userId: string): Promise<Student[]> {
    return this.studentsRepository.find({
      where: { createdById: userId }
    });
  }

  async findOne(id: string, requestingUserId: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({ 
      where: { id },
      relations: ['createdBy'],
    });
    
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    if (student.id !== requestingUserId && student.createdById !== requestingUserId) {
      throw new ForbiddenException('Access denied');
    }

    return student;
  }
  
  async update(id: string, updateStudentDto: UpdateStudentDto, requestingUserId: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    if (student.createdById !== requestingUserId) {
      throw new ForbiddenException('Access denied');
    }

    const updatedStudent = this.studentsRepository.merge(student, updateStudentDto);
    return await this.studentsRepository.save(updatedStudent);
  }

  async remove(id: string, requestingUserId: string): Promise<void> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    if (student.createdById !== requestingUserId) {
      throw new ForbiddenException('Access denied');
    }
    
    await this.studentsRepository.softDelete(id);
  }

}
