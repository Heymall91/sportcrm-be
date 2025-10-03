import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../core/entity/entities/Users";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.phone = createUserDto.phone;
    user.email = createUserDto.email;

    user.password = await bcrypt.hash(createUserDto.password, 10);

    user.gender = createUserDto.gender;

    return await this.usersRepository.save(user);
  }
}