import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    
    if (!request.auth0ID) {
      throw new UnauthorizedException('Auth0 ID not found in request');
    }

    try {
      let user = await this.usersService.findByAuth0Id(request.auth0ID);

      if (!user) {

        const email = request.auth?.payload?.email || `${request.auth0ID}@temp.com`;
        
        user = await this.usersService.findOrCreateByAuth0Id({
          auth0ID: request.auth0ID,
          email: email,
        });
      }

      request.user = user;
      
      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Failed to load or create user');
    }
  }
}