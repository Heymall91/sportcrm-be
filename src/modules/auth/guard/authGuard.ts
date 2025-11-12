// src/auth/guards/auth0.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class Auth0Guard implements CanActivate {
  private checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    tokenSigningAlg: 'RS256',
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return new Promise((resolve, reject) => {
      this.checkJwt(request, response, (err) => {
        if (err) {
          reject(new UnauthorizedException('Invalid or missing token'));
        }
        resolve(true);
      });
    });
  }
}