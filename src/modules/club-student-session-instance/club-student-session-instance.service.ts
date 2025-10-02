import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { ClubStudentSessionInstanceRepository } from './club-student-session-instance.repository';
import { CreateClubStudentSessionInstanceDto } from './dto/create-club-student-session-instance.dto';
import { UpdateClubStudentSessionInstanceDto } from './dto/update-club-student-session-instance.dto';
import { ClubStudentSessionInstance } from 'src/modules/club-student-session-instance/entities/club-student-session-instance.entity';

@Injectable()
export class ClubStudentSessionInstanceService {
  constructor(
    private readonly clubStudentSessionInstanceRepository: ClubStudentSessionInstanceRepository,
  ) {}

  async createClubStudentSessionInstance(
    createClubStudentSessionInstanceDto: CreateClubStudentSessionInstanceDto,
  ): Promise<ClubStudentSessionInstance> {
    const result = await this.clubStudentSessionInstanceRepository.create(
      createClubStudentSessionInstanceDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getClubStudentSessionInstances(): Promise<
    ClubStudentSessionInstance[]
  > {
    const result = this.clubStudentSessionInstanceRepository.findAll();

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getClubStudentSessionInstance(
    id: UUID,
  ): Promise<ClubStudentSessionInstance> {
    const result = await this.clubStudentSessionInstanceRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateClubStudentSessionInstance(
    id: UUID,
    updateClubStudentSessionInstanceDto: UpdateClubStudentSessionInstanceDto,
  ): Promise<ClubStudentSessionInstance> {
    const result = await this.clubStudentSessionInstanceRepository.update(
      id,
      updateClubStudentSessionInstanceDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.clubStudentSessionInstanceRepository.findOne(id);
  }

  async removeClubStudentSessionInstance(
    id: UUID,
  ): Promise<ClubStudentSessionInstance> {
    const result = await this.clubStudentSessionInstanceRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.clubStudentSessionInstanceRepository.findParanoid(id);
  }
}
