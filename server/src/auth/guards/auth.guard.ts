import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    if (request.session && request.session.user) {
      return true;
    }
    throw new UnauthorizedException('User not authenticated');
  }
}
