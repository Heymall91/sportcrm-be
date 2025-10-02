import { BadRequestException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ErrorMap } from 'src/shared/common/utils/response/error.map';
import { Hash } from 'src/shared/helpers/hash';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hash: Hash,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.hash.hash(createUserDto.password);
    const result = await this.usersRepository.create(createUserDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }

    return result;
  }

  async getUsers(): Promise<User[]> {
    const result = Array.from(await this.usersRepository.findAll());

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async getUser(id: UUID): Promise<User> {
    const result = await this.usersRepository.findOne(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    return result;
  }

  async updateUser(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    if (!!updateUserDto.password) {
      updateUserDto.password = await this.hash.hash(updateUserDto.password);
    }

    const result = await this.usersRepository.update(id, updateUserDto);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_UPDATE_MODEL);
    }

    return this.usersRepository.findOne(id);
  }

  async removeUser(id: UUID): Promise<User> {
    const result = await this.usersRepository.remove(id);

    if (!result) {
      throw new BadRequestException(ErrorMap.CANNOT_DELETE_MODEL);
    }

    return this.usersRepository.findParanoid(id);
  }
}
