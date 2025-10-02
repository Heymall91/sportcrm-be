import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { ClubStudentRepository } from './club-student.repository';
import { CreateClubStudentDto } from './dto/create-club-student.dto';
import { UpdateClubStudentDto } from './dto/update-club-student.dto';
import { ClubStudent } from './entities/club-student.entity';

@Injectable()
export class ClubStudentService {
  constructor(private readonly clubStudentsRepository: ClubStudentRepository) {}

  async createClubStudent(
    createClubStudentDto: CreateClubStudentDto,
  ): Promise<ClubStudent> {
    const result =
      await this.clubStudentsRepository.create(createClubStudentDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getClubStudents(): Promise<ClubStudent[]> {
    const result = Array.from(await this.clubStudentsRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getClubStudent(id: UUID): Promise<ClubStudent> {
    const result = await this.clubStudentsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateClubStudent(
    id: UUID,
    updateClubStudentDto: UpdateClubStudentDto,
  ): Promise<ClubStudent> {
    const result = await this.clubStudentsRepository.update(
      id,
      updateClubStudentDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.clubStudentsRepository.findOne(id);
  }

  async removeClubStudent(id: UUID): Promise<ClubStudent> {
    const result = await this.clubStudentsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.clubStudentsRepository.findParanoid(id);
  }
}
