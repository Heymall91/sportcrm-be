import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Auth0Dto } from './dto/create-auth-dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(auth0Payload: any): Promise<User> {
    // Map common Auth0 fields into our DTO. Keep optional fields safe if not present.
    const auth0Data: Auth0Dto = {
      auth0ID: auth0Payload.sub,
      email: auth0Payload.email,
      firstName: auth0Payload.given_name ?? auth0Payload.name ?? undefined,
      lastName: auth0Payload.family_name ?? undefined,
      name: auth0Payload.name ?? undefined,
    };

    return this.usersService.findOrCreateByAuth0Id(auth0Data);
  }

  async getUserByAuth0Id(auth0ID: string): Promise<User | null> {
    return this.usersService.findByAuth0Id(auth0ID);
  }
}