import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { SessionScheduleRepository } from './session-schedule.repository';
import { CreateSessionScheduleDto } from './dto/create-session-schedule.dto';
import { UpdateSessionScheduleDto } from './dto/update-session-schedule.dto';
import { SessionSchedule } from './entities/session-schedule.entity';

@Injectable()
export class SessionScheduleService {
  constructor(
    private readonly sessionScheduleRepository: SessionScheduleRepository,
  ) {}

  async createSessionSchedule(
    createSessionScheduleDto: CreateSessionScheduleDto,
  ): Promise<SessionSchedule> {
    const result = await this.sessionScheduleRepository.create(
      createSessionScheduleDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getSessionSchedules(): Promise<SessionSchedule[]> {
    const result = await this.sessionScheduleRepository.findAll();

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getSessionSchedule(id: UUID): Promise<SessionSchedule> {
    const result = await this.sessionScheduleRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateSessionSchedule(
    id: UUID,
    updateSessionScheduleDto: UpdateSessionScheduleDto,
  ) {
    const result = await this.sessionScheduleRepository.update(
      id,
      updateSessionScheduleDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.sessionScheduleRepository.findOne(id);
  }

  async removeSessionSchedule(id: UUID): Promise<SessionSchedule> {
    const result = await this.sessionScheduleRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.sessionScheduleRepository.findParanoid(id);
  }
}
