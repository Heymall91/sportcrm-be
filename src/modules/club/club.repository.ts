import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from '../../shared/helpers/repositories';
import { CLUB_INCLUDE } from './entities/club.include';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubRepository {
  constructor(
    @Inject(REPOSITORIES.CLUB) private clubsRepository: typeof Club,
  ) {}

  async create(createClubDto: CreateClubDto): Promise<Club> {
    return this.clubsRepository.create<Club>(
      { ...createClubDto },
      { include: CLUB_INCLUDE.create() },
    );
  }

  async findAll(): Promise<Club[]> {
    return this.clubsRepository.findAll({
      include: CLUB_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<Club> {
    return this.clubsRepository.findOne({
      where: { id },
      include: CLUB_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<Club> {
    return this.clubsRepository.findOne({
      where: { id },
      include: CLUB_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(id: UUID, updateClubDto: UpdateClubDto): Promise<[number]> {
    return this.clubsRepository.update(updateClubDto, { where: { id } });
  }

  async remove(id: UUID): Promise<number> {
    return this.clubsRepository.destroy({ where: { id } });
  }
}
