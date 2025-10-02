import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from '../../shared/helpers/repositories';
import { CLUB_STAFF_INCLUDE } from './entities/club-staff.include';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';
import { ClubStaff } from './entities/club-staff.entity';

@Injectable()
export class ClubStaffRepository {
  constructor(
    @Inject(REPOSITORIES.CLUB_STAFF)
    private clubStaffsRepository: typeof ClubStaff,
  ) {}

  async create(createClubStaffDto: CreateClubStaffDto): Promise<ClubStaff> {
    return this.clubStaffsRepository.create<ClubStaff>(
      {
        ...createClubStaffDto,
      },
      { include: CLUB_STAFF_INCLUDE.create() },
    );
  }

  async findAll(): Promise<ClubStaff[]> {
    return this.clubStaffsRepository.findAll({
      include: CLUB_STAFF_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<ClubStaff> {
    return this.clubStaffsRepository.findOne({
      where: { id },
      include: CLUB_STAFF_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<ClubStaff> {
    return this.clubStaffsRepository.findOne({
      where: { id },
      include: CLUB_STAFF_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(
    id: UUID,
    updateClubStaffDto: UpdateClubStaffDto,
  ): Promise<[number]> {
    return this.clubStaffsRepository.update(updateClubStaffDto, {
      where: { id },
    });
  }

  async remove(id: UUID): Promise<number> {
    return this.clubStaffsRepository.destroy({ where: { id } });
  }
}
