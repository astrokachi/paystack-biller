import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { GoogleAuthService } from '../config/google.auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private googleAuthService: GoogleAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const accessToken = request.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    const isValid = await this.googleAuthService.verifyAccessToken(accessToken);
    // console.log(isValid);
    if (!isValid) {
      throw new UnauthorizedException('Invalid access token');
    }

    console.log(request.session.user);
    if (request.session && request.session.user) {
      return true;
    }
    throw new UnauthorizedException('User not authenticated');
  }
}
