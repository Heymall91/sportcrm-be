import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { SessionParticipantRepository } from './session-participant.repository';
import { CreateSessionParticipantDto } from './dto/create-session-participant.dto';
import { UpdateSessionParticipantDto } from './dto/update-session-participant.dto';
import { SessionParticipant } from './entities/session-participant.entity';

@Injectable()
export class SessionParticipantService {
  constructor(
    private readonly sessionParticipantRepository: SessionParticipantRepository,
  ) {}

  async createSessionParticipant(
    createSessionParticipantDto: CreateSessionParticipantDto,
  ): Promise<SessionParticipant> {
    const result = await this.sessionParticipantRepository.create(
      createSessionParticipantDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getSessionParticipants(): Promise<SessionParticipant[]> {
    const result = await this.sessionParticipantRepository.findAll();

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getSessionParticipant(id: UUID): Promise<SessionParticipant> {
    const result = await this.sessionParticipantRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateSessionParticipant(
    id: UUID,
    updateSessionParticipantDto: UpdateSessionParticipantDto,
  ) {
    const result = await this.sessionParticipantRepository.update(
      id,
      updateSessionParticipantDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.sessionParticipantRepository.findOne(id);
  }

  async removeSessionParticipant(id: UUID): Promise<SessionParticipant> {
    const result = await this.sessionParticipantRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.sessionParticipantRepository.findParanoid(id);
  }
}
