import {
  Controller,
  Get,
  Req,
  Res,
  // Req,
  // Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply, FastifyRequest } from 'fastify';
// import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.redirect('/');
  }
}
