import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { ClubRepository } from './club.repository';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubService {
  constructor(private readonly clubsRepository: ClubRepository) {}

  async createClub(createClubDto: CreateClubDto): Promise<Club> {
    const result = await this.clubsRepository.create(createClubDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getClubs(): Promise<Club[]> {
    const result = Array.from(await this.clubsRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getClub(id: UUID): Promise<Club> {
    const result = await this.clubsRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateClub(id: UUID, updateClubDto: UpdateClubDto): Promise<Club> {
    const result = await this.clubsRepository.update(id, updateClubDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.clubsRepository.findOne(id);
  }

  async removeClub(id: UUID): Promise<Club> {
    const result = await this.clubsRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.clubsRepository.findParanoid(id);
  }
}
