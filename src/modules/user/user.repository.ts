import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { REPOSITORIES } from '../../shared/helpers/repositories';
import { USER_INCLUDE } from './entities/user.include';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(REPOSITORIES.USER) private usersRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create<User>(
      { ...createUserDto },
      { include: USER_INCLUDE.create() },
    );
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll({
      include: USER_INCLUDE.getAll(),
    });
  }

  async findOne(id: UUID): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      include: USER_INCLUDE.getOne(),
    });
  }

  async findParanoid(id: UUID): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      include: USER_INCLUDE.getOne(),
      paranoid: false,
    });
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<[number]> {
    return this.usersRepository.update(updateUserDto, { where: { id } });
  }

  async remove(id: UUID): Promise<number> {
    return this.usersRepository.destroy({ where: { id } });
  }
}
