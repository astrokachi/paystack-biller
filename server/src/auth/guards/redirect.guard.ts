import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GoogleAuthService } from '../config/google.auth.service';
import { FastifyReply } from 'fastify';

@Injectable()
export class RedirectGuard implements CanActivate {
  constructor(private googleAuthService: GoogleAuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const authUrl = this.googleAuthService.getAuthUrl();
    response.redirect(authUrl, 302);
    return false;
  }
}
