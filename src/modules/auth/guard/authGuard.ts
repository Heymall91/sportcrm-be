import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class Auth0Guard implements CanActivate {
  private readonly checkJwt: any;

  constructor(private configService: ConfigService) {
    const audience = this.configService.get<string>('AUTH0_AUDIENCE');
    const domain = this.configService.get<string>('AUTH0_DOMAIN');

    if (!audience || !domain) {
      throw new Error('AUTH0_AUDIENCE and AUTH0_DOMAIN must be defined');
    }

    this.checkJwt = auth({
      audience,
      issuerBaseURL: `https://${domain}`,
      tokenSigningAlg: 'RS256'
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  const response = context.switchToHttp().getResponse();

  return new Promise((resolve, reject) => {
    this.checkJwt(request, response, (err: any) => {
      
      if (err) {
        reject(new UnauthorizedException(err.message || 'Invalid token'));
        return;
      }
      if (!request.auth) {
        reject(new UnauthorizedException('Authentication required'));
        return;
      }
      
      request.auth0ID = request.auth.payload.sub;
      
      resolve(true);
    });
  });
}
}