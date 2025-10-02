import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { ClubStaffRepository } from './club-staff.repository';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';
import { ClubStaff } from './entities/club-staff.entity';

@Injectable()
export class ClubStaffService {
  constructor(private readonly clubStaffsRepository: ClubStaffRepository) {}

  async createClubStaff(
    createClubStaffDto: CreateClubStaffDto,
  ): Promise<ClubStaff> {
    const result = await this.clubStaffsRepository.create(createClubStaffDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getClubStaffs(): Promise<ClubStaff[]> {
    const result = Array.from(await this.clubStaffsRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getClubStaff(id: UUID): Promise<ClubStaff> {
    const result = await this.clubStaffsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateClubStaff(
    id: UUID,
    updateClubStaffDto: UpdateClubStaffDto,
  ): Promise<ClubStaff> {
    const result = await this.clubStaffsRepository.update(
      id,
      updateClubStaffDto,
    );

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.clubStaffsRepository.findOne(id);
  }

  async removeClubStaff(id: UUID): Promise<ClubStaff> {
    const result = await this.clubStaffsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.clubStaffsRepository.findParanoid(id);
  }
}
