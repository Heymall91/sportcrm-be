import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth0Dto } from '../auth/dto/create-auth-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async delete(id: string): Promise<DeleteResult> {
    const res = await this.usersRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return res;
  }

  // auth0service

  async findOrCreateByAuth0Id(auth0Data: Auth0Dto): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: { auth0ID: auth0Data.auth0ID },
    });

    if (!user) {
      user = this.usersRepository.create({
        ...auth0Data
      });
    } else {
      user.email = auth0Data.email;
      user.auth0ID = auth0Data.auth0ID;
    }

    return await this.usersRepository.save(user);
  }

  async findByAuth0Id(auth0ID: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { auth0ID } });
  }
}
