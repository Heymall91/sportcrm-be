import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { ClubStudentSessionRepository } from './club-student-session.repository';
import { CreateClubStudentSessionDto } from './dto/create-club-student-session.dto';
import { UpdateClubStudentSessionDto } from './dto/update-club-student-session.dto';
import { ClubStudentSession } from './entities/club-student-session.entity';

@Injectable()
export class ClubStudentSessionService {
  constructor(
    private readonly clubStudentSessionsRepository: ClubStudentSessionRepository,
  ) {}

  async createClubStudentSession(
    createClubStudentSessionDto: CreateClubStudentSessionDto,
  ): Promise<ClubStudentSession> {
    const result = await this.clubStudentSessionsRepository.create(
      createClubStudentSessionDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getClubStudentSessions(): Promise<ClubStudentSession[]> {
    const result = Array.from(
      await this.clubStudentSessionsRepository.findAll(),
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getClubStudentSession(id: UUID): Promise<ClubStudentSession> {
    const result = await this.clubStudentSessionsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateClubStudentSession(
    id: UUID,
    updateClubStudentSessionDto: UpdateClubStudentSessionDto,
  ): Promise<ClubStudentSession> {
    const result = await this.clubStudentSessionsRepository.update(
      id,
      updateClubStudentSessionDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.clubStudentSessionsRepository.findOne(id);
  }

  async removeClubStudentSession(id: UUID): Promise<ClubStudentSession> {
    const result = await this.clubStudentSessionsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.clubStudentSessionsRepository.findParanoid(id);
  }
}
