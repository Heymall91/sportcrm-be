import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DeleteResult } from 'typeorm';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  create(createClubDto: CreateClubDto) {
    return this.clubRepository.save(createClubDto);
  }

  findAll() {
    return this.clubRepository.find();
  }

  async findOne(id: string): Promise<Club> {
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException(`Club with this ID ${id} doesn't found`);
    }
    return club;
  }

  async update(id: string, updateClubDto: UpdateClubDto): Promise<Club> {
    await this.clubRepository.update(id, updateClubDto);
    const club = await this.clubRepository.findOne({ where: { id } });
    if (!club) {
      throw new NotFoundException(`Club with this ID ${id} doesn't found`);
    }

    return club;
  }

  async delete(id: string): Promise<DeleteResult> {
    const res = await this.clubRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return res;
  }
}
