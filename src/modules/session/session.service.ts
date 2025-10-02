import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { SessionRepository } from './session.repository';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(private readonly sessionsRepository: SessionRepository) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const result = await this.sessionsRepository.create(createSessionDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getSessions(): Promise<Session[]> {
    const result = Array.from(await this.sessionsRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getSession(id: UUID): Promise<Session> {
    const result = await this.sessionsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateSession(
    id: UUID,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const result = await this.sessionsRepository.update(id, updateSessionDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.sessionsRepository.findOne(id);
  }

  async removeSession(id: UUID): Promise<Session> {
    const result = await this.sessionsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.sessionsRepository.findParanoid(id);
  }
}
