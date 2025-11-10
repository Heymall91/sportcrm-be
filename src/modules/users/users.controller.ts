import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User has been created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all users' })
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  @ApiResponse({ status: 404, description: 'Users not found' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User identificator',
    example: 'c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba',
  })
  @ApiResponse({ status: 200, description: 'User found', type: CreateUserDto })
  @ApiResponse({ status: 404, description: "User doesn't found" })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CreateUserDto> {
    const user = await this.usersService.findOne(id);
    return plainToInstance(CreateUserDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit/update user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User identificator',
    example: 'c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Update error' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return plainToInstance(UpdateUserDto, updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleting user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User identificator',
    example: 'c5d9367e-f6b4-41b0-a8e3-fe8d9c4e31ba',
  })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
