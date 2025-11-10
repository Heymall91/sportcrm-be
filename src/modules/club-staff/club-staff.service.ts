import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubStaff } from './entities/club-staff.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';

@Injectable()
export class ClubStaffService {
  constructor(
    @InjectRepository(ClubStaff)
    private readonly clubStaffService: Repository<ClubStaff>,
  ) {}

  create(createClubStaffDto: CreateClubStaffDto) {
    const clubStaff = this.clubStaffService.create({
      club: { id: createClubStaffDto.clubId },
      user: { id: createClubStaffDto.userId },
      status: createClubStaffDto.status,
    });
    return this.clubStaffService.save(clubStaff);
  }

  findAll() {
    return this.clubStaffService.find({
      loadRelationIds: true,
    });
  }

  async findOne(id: string): Promise<ClubStaff> {
    const clubStaff = await this.clubStaffService.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!clubStaff) {
      throw new NotFoundException(`Club staff with this ID ${id} not found`);
    }

    return clubStaff;
  }

  async update(
    id: string,
    updateClubStaffDto: UpdateClubStaffDto,
  ): Promise<ClubStaff> {
    await this.clubStaffService.update(id, updateClubStaffDto);
    const clubStaff = await this.clubStaffService.findOne({ where: { id } });
    if (!clubStaff) {
      throw new NotFoundException(`Club staff with this ID ${id} not found`);
    }
    return clubStaff;
  }

  async delete(id: string): Promise<DeleteResult> {
    const res = await this.clubStaffService.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Club staff with ID ${id} not found`);
    }
    return res;
  }
}
