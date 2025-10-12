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
    return this.clubStaffService.save(createClubStaffDto)
  }

  findAll() {
    return this.clubStaffService.find()
  }

  findOne(id: number) {
    return this.clubStaffService.findOneBy({id: String(id)})
  }

  update(id: number, updateClubStaffDto: UpdateClubStaffDto) {
    return this.clubStaffService.update(id, updateClubStaffDto)
  }

  remove(id: number) {
    return this.clubStaffService.delete({id: String(id)})
  }
}
