import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from '../../shared/helpers/repositories';
import { CLUB_STUDENT_INCLUDE } from './entities/club-student.include';
import { CreateClubStudentDto } from './dto/create-club-student.dto';
import { UpdateClubStudentDto } from './dto/update-club-student.dto';
import { ClubStudent } from './entities/club-student.entity';

@Injectable()
export class ClubStudentRepository {
  constructor(
    @Inject(REPOSITORIES.CLUB_STUDENT)
    private clubStudentsRepository: typeof ClubStudent,
  ) {}

  async create(
    createClubStudentDto: CreateClubStudentDto,
  ): Promise<ClubStudent> {
    return this.clubStudentsRepository.create<ClubStudent>(
      {
        ...createClubStudentDto,
      },
      { include: CLUB_STUDENT_INCLUDE.create() },
    );
  }

  async findAll(): Promise<ClubStudent[]> {
    return this.clubStudentsRepository.findAll({
      include: CLUB_STUDENT_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<ClubStudent> {
    return this.clubStudentsRepository.findOne({
      where: { id },
      include: CLUB_STUDENT_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<ClubStudent> {
    return this.clubStudentsRepository.findOne({
      where: { id },
      include: CLUB_STUDENT_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateClubStudentDto: UpdateClubStudentDto,
  ): Promise<[number]> {
    return this.clubStudentsRepository.update(updateClubStudentDto, {
      where: { id },
    });
  }

  async remove(id: UUID): Promise<number> {
    return this.clubStudentsRepository.destroy({ where: { id } });
  }
}
