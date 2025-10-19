import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubsService {

  constructor(@InjectRepository(Club)
    private readonly clubRepository: Repository<Club>
  ){}

  create(createClubDto: CreateClubDto) {
    return this.clubRepository.save(createClubDto);
  }

  findAll() {
    return this.clubRepository.find();
  }

  findOne(id: string) {
    return this.clubRepository.findOneBy({id: String(id)});
  }

  update(id: string, updateClubDto: UpdateClubDto) {
    return this.clubRepository.update(id, updateClubDto);
  }

  delete(id: string) {
    return this.clubRepository.delete(id);
  }
}
