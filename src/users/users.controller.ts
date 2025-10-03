import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.services";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "../core/entity/entities/Users";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }
}
