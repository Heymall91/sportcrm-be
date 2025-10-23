import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubStaff } from './entities/club-staff.entity';
import { Repository } from 'typeorm';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';

@Injectable()
export class ClubStaffService {
  constructor(
    @InjectRepository(ClubStaff)
    private readonly clubStaffService: Repository<ClubStaff>
  ){}

  create(createClubStaffDto: CreateClubStaffDto) {
    const clubStaff = this.clubStaffService.create({
      club: {id: createClubStaffDto.clubId},
      user: {id: createClubStaffDto.userId},
      status: createClubStaffDto.status
    });
    return this.clubStaffService.save(clubStaff)
  }

  findAll() {
    return this.clubStaffService.find({
      loadRelationIds: true
    })
  }

  findOne(id: string) {
    return this.clubStaffService.findOne({where: { id }, loadRelationIds: true});
  }

  update(id: string, updateClubStaffDto: UpdateClubStaffDto) {
    return this.clubStaffService.update(id, updateClubStaffDto)
  }

  remove(id: string) {
    return this.clubStaffService.delete(id)
  }
}
