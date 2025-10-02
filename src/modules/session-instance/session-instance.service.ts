import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { SessionInstanceRepository } from './session-instance.repository';
import { CreateSessionInstanceDto } from './dto/create-session-instance.dto';
import { UpdateSessionInstanceDto } from './dto/update-session-instance.dto';
import { SessionInstance } from './entities/session-instance.entity';

@Injectable()
export class SessionInstanceService {
  constructor(
    private readonly sessionInstanceRepository: SessionInstanceRepository,
  ) {}

  async createSessionInstance(
    createSessionInstanceDto: CreateSessionInstanceDto,
  ): Promise<SessionInstance> {
    const result = await this.sessionInstanceRepository.create(
      createSessionInstanceDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getSessionInstances(): Promise<SessionInstance[]> {
    const result = await this.sessionInstanceRepository.findAll();

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getSessionInstance(id: UUID): Promise<SessionInstance> {
    const result = await this.sessionInstanceRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateSessionInstance(
    id: UUID,
    updateSessionInstanceDto: UpdateSessionInstanceDto,
  ) {
    const result = await this.sessionInstanceRepository.update(
      id,
      updateSessionInstanceDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.sessionInstanceRepository.findOne(id);
  }

  async removeSessionInstance(id: UUID): Promise<SessionInstance> {
    const result = await this.sessionInstanceRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.sessionInstanceRepository.findParanoid(id);
  }
}
