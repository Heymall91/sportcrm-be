import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { CLUB_STUDENT_SESSION_INSTANCE_INCLUDE } from './entities/club-student-session-instance.include';
import { CreateClubStudentSessionInstanceDto } from './dto/create-club-student-session-instance.dto';
import { UpdateClubStudentSessionInstanceDto } from './dto/update-club-student-session-instance.dto';
import { ClubStudentSessionInstance } from './entities/club-student-session-instance.entity';

@Injectable()
export class ClubStudentSessionInstanceRepository {
  constructor(
    @Inject(REPOSITORIES.CLUB_STUDENT_SESSION_INSTANCE)
    private clubStudentSessionInstance: typeof ClubStudentSessionInstance,
  ) {}

  async create(
    createClubStudentSessionInstanceDto: CreateClubStudentSessionInstanceDto,
  ): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstance.create<ClubStudentSessionInstance>(
      {
        ...createClubStudentSessionInstanceDto,
      },
      { include: CLUB_STUDENT_SESSION_INSTANCE_INCLUDE.create() },
    );
  }

  async findAll(): Promise<ClubStudentSessionInstance[]> {
    return this.clubStudentSessionInstance.findAll({
      include: CLUB_STUDENT_SESSION_INSTANCE_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstance.findOne({
      where: { id },
      include: CLUB_STUDENT_SESSION_INSTANCE_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<ClubStudentSessionInstance> {
    return this.clubStudentSessionInstance.findOne({
      where: { id },
      include: CLUB_STUDENT_SESSION_INSTANCE_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateClubStudentSessionInstanceDto: UpdateClubStudentSessionInstanceDto,
  ): Promise<[number]> {
    return this.clubStudentSessionInstance.update(
      updateClubStudentSessionInstanceDto,
      { where: { id } },
    );
  }

  async remove(id: UUID): Promise<number> {
    return this.clubStudentSessionInstance.destroy({ where: { id } });
  }
}
