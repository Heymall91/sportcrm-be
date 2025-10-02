import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { SESSION_INCLUDE } from './entities/session.include';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionRepository {
  constructor(
    @Inject(REPOSITORIES.SESSION) private sessionsRepository: typeof Session,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsRepository.create<Session>(
      { ...createSessionDto },
      { include: SESSION_INCLUDE.create() },
    );
  }

  async findAll(): Promise<Session[]> {
    return this.sessionsRepository.findAll({
      include: SESSION_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<Session> {
    return this.sessionsRepository.findOne({
      where: { id },
      include: SESSION_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<Session> {
    return this.sessionsRepository.findOne({
      where: { id },
      include: SESSION_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateSessionDto: UpdateSessionDto,
  ): Promise<[number]> {
    return this.sessionsRepository.update(updateSessionDto, { where: { id } });
  }

  async remove(id: UUID): Promise<number> {
    return this.sessionsRepository.destroy({ where: { id } });
  }
}
