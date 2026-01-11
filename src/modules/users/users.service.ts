import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto, creatorId: string) {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      createdById: creatorId
    });
    return this.usersRepository.save(newUser);
  }

  findAllByCreator(creatorId: string) {
    return this.usersRepository.find({
      where: { createdById: creatorId },
    });
  }

  async findOne(id: string, requestingUserId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['createdBy'],
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.id !== requestingUserId && user.createdById !== requestingUserId) {
      throw new ForbiddenException('Access denied');
    }

    return user;
  }
  
  async update(id: string, updateUserDto: UpdateUserDto, requestingUserId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.id !== requestingUserId && user.createdById !== requestingUserId) {
      throw new ForbiddenException('Access denied');
    }

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(updatedUser);
  }

  async delete(id: string, requestingUserId: string): Promise<DeleteResult> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.createdById !== requestingUserId) {
      throw new ForbiddenException('Access denied');
    }

    return await this.usersRepository.delete(id);
  }

  // auth0service

  async findOrCreateByAuth0Id(auth0Data: Auth0Dto): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: { auth0ID: auth0Data.auth0ID },
    });

    if (!user) {
      user = this.usersRepository.create({
        auth0ID: auth0Data.auth0ID,
        email: auth0Data.email,
        firstName: '',
        lastName: '', 
        isRegistrationCompleted: false,
      });
      user = await this.usersRepository.save(user);
    }

    return user;
  }

  async findByAuth0Id(auth0ID: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { auth0ID } });
  }
}
