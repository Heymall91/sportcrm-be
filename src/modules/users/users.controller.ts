import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary: "Create a new user"})
  @ApiBody({type: CreateUserDto})
  @ApiResponse({status: 200, description: "User has been created"})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: "Get a list of all user"})
  @ApiBody({type: CreateUserDto})
  @ApiResponse({status: 200, description: "List of all users"})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get user by ID"})
  @ApiBody({type: CreateUserDto})
  @ApiParam({ name: 'id', description: "User identificator", example: "c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba"})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Edit/update user by ID"})
  @ApiParam({ name: 'id', description: "User identificator", example: "c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba"})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Deleting user by ID"})
  @ApiParam({ name: 'id', description: "User identificator", example: "c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba"})
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
