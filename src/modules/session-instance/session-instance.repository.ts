import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from 'src/shared/helpers/repositories';
import { SESSION_INSTANCE_INCLUDE } from './entities/session-instance.include';
import { CreateSessionInstanceDto } from './dto/create-session-instance.dto';
import { UpdateSessionInstanceDto } from './dto/update-session-instance.dto';
import { SessionInstance } from './entities/session-instance.entity';

@Injectable()
export class SessionInstanceRepository {
  constructor(
    @Inject(REPOSITORIES.SESSION_INSTANCE)
    private sessionsInstanceRepository: typeof SessionInstance,
  ) {}

  async create(
    createSessionInstanceDto: CreateSessionInstanceDto,
  ): Promise<SessionInstance> {
    return this.sessionsInstanceRepository.create<SessionInstance>(
      {
        ...createSessionInstanceDto,
      },
      { include: SESSION_INSTANCE_INCLUDE.create() },
    );
  }
  async findAll(): Promise<SessionInstance[]> {
    return this.sessionsInstanceRepository.findAll({
      include: SESSION_INSTANCE_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<SessionInstance> {
    return this.sessionsInstanceRepository.findOne({
      where: { id },
      include: SESSION_INSTANCE_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<SessionInstance> {
    return this.sessionsInstanceRepository.findOne({
      where: { id },
      include: SESSION_INSTANCE_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateSessionInstanceDto: UpdateSessionInstanceDto,
  ): Promise<[number]> {
    return this.sessionsInstanceRepository.update(updateSessionInstanceDto, {
      where: { id },
    });
  }

  async remove(id: UUID): Promise<number> {
    return this.sessionsInstanceRepository.destroy({ where: { id } });
  }
}
