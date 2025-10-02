import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { SESSION_PARTICIPANT_INCLUDE } from './entities/session-participant.include';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto';
import { CreateSessionParticipantDto } from './dto/create-session-participant.dto';
import { SessionParticipant } from './entities/session-participant.entity';

@Injectable()
export class SessionParticipantRepository {
  constructor(
    @Inject(REPOSITORIES.SESSION_PARTICIPANT)
    private sessionsParticipantRepository: typeof SessionParticipant,
  ) {}

  async create(
    createSessionParticipantDto: CreateSessionParticipantDto,
  ): Promise<SessionParticipant> {
    return this.sessionsParticipantRepository.create<SessionParticipant>(
      {
        ...createSessionParticipantDto,
      },
      { include: SESSION_PARTICIPANT_INCLUDE.create() },
    );
  }
  async findAll(): Promise<SessionParticipant[]> {
    return this.sessionsParticipantRepository.findAll({
      include: SESSION_PARTICIPANT_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<SessionParticipant> {
    return this.sessionsParticipantRepository.findOne({
      where: { id },
      include: SESSION_PARTICIPANT_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<SessionParticipant> {
    return this.sessionsParticipantRepository.findOne({
      where: { id },
      include: SESSION_PARTICIPANT_INCLUDE.getOne(),
    });
  }

  async update(
    id: UUID,
    updateSessionParticipantDto: UpdateSessionParticipantDto,
  ): Promise<[number]> {
    return this.sessionsParticipantRepository.update(
      updateSessionParticipantDto,
      { where: { id } },
    );
  }

  async remove(id: UUID): Promise<number> {
    return this.sessionsParticipantRepository.destroy({ where: { id } });
  }
}
