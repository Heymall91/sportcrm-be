import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
    async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto): Promise<User> {
      await this.usersService.update(id, updateUserDto);
      const user = await this.usersService.findOne(id);
  
      if (!user) throw new NotFoundException('User not found');
      return user;
    }

 @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
  return this.usersService.delete(id);
}
}
