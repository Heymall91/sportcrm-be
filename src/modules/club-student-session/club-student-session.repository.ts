import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { CLUB_STUDENT_SESSION_INCLUDE } from './entities/club-student-session.include';
import { CreateClubStudentSessionDto } from './dto/create-club-student-session.dto';
import { UpdateClubStudentSessionDto } from './dto/update-club-student-session.dto';
import { ClubStudentSession } from './entities/club-student-session.entity';

@Injectable()
export class ClubStudentSessionRepository {
  constructor(
    @Inject(REPOSITORIES.CLUB_STUDENT_SESSION)
    private clubStudentSessionsRepository: typeof ClubStudentSession,
  ) {}

  async create(
    createClubStudentSessionDto: CreateClubStudentSessionDto,
  ): Promise<ClubStudentSession> {
    return this.clubStudentSessionsRepository.create<ClubStudentSession>(
      {
        ...createClubStudentSessionDto,
      },
      { include: CLUB_STUDENT_SESSION_INCLUDE.create() },
    );
  }

  async findAll(): Promise<ClubStudentSession[]> {
    return this.clubStudentSessionsRepository.findAll({
      include: CLUB_STUDENT_SESSION_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<ClubStudentSession> {
    return this.clubStudentSessionsRepository.findOne({
      where: { id },
      include: CLUB_STUDENT_SESSION_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<ClubStudentSession> {
    return this.clubStudentSessionsRepository.findOne({
      where: { id },
      include: CLUB_STUDENT_SESSION_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateClubStudentSessionDto: UpdateClubStudentSessionDto,
  ): Promise<[number]> {
    return this.clubStudentSessionsRepository.update(
      updateClubStudentSessionDto,
      { where: { id } },
    );
  }

  async remove(id: UUID): Promise<number> {
    return this.clubStudentSessionsRepository.destroy({ where: { id } });
  }
}
