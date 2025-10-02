import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { SESSION_SCHEDULE_INCLUDE } from './entities/session-schedule.include';
import { CreateSessionScheduleDto } from './dto/create-session-schedule.dto';
import { UpdateSessionScheduleDto } from './dto/update-session-schedule.dto';
import { SessionSchedule } from './entities/session-schedule.entity';

@Injectable()
export class SessionScheduleRepository {
  constructor(
    @Inject(REPOSITORIES.SESSION_SCHEDULE)
    private sessionScheduleRepository: typeof SessionSchedule,
  ) {}

  async create(
    createSessionScheduleDto: CreateSessionScheduleDto,
  ): Promise<SessionSchedule> {
    return this.sessionScheduleRepository.create<SessionSchedule>(
      {
        ...createSessionScheduleDto,
      },
      { include: SESSION_SCHEDULE_INCLUDE.create() },
    );
  }
  async findAll(): Promise<SessionSchedule[]> {
    return this.sessionScheduleRepository.findAll({
      include: SESSION_SCHEDULE_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<SessionSchedule> {
    return this.sessionScheduleRepository.findOne({
      where: { id },
      include: SESSION_SCHEDULE_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<SessionSchedule> {
    return this.sessionScheduleRepository.findOne({
      where: { id },
      include: SESSION_SCHEDULE_INCLUDE.getOne(),
    });
  }

  async update(
    id: UUID,
    updateSessionScheduleDto: UpdateSessionScheduleDto,
  ): Promise<[number]> {
    return this.sessionScheduleRepository.update(updateSessionScheduleDto, {
      where: { id },
    });
  }

  async remove(id: UUID): Promise<number> {
    return this.sessionScheduleRepository.destroy({ where: { id } });
  }
}
