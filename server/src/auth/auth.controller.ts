import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RedirectGuard } from './guards/redirect.guard';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GoogleAuthService } from './config/google.auth.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private googleAuthService: GoogleAuthService,
    private authService: AuthService,
  ) {}
  @Get('google')
  @UseGuards(RedirectGuard)
  googleAuth() {}

  @Get('google/callback')
  async verifyCode(
    @Query('code') code: string,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const tokensAndUserInfo =
      await this.googleAuthService.getTokensAndUserInfo(code);
    const user = await this.authService.saveUser(
      tokensAndUserInfo.user,
      tokensAndUserInfo.tokens,
    );
    if (user) {
      req.session.set('user', user);
      return res.status(HttpStatus.OK).send({
        msg: 'User added successfully',
        data: user,
      });
    }
    return null;
  }

  @Get('test-session')
  testSession(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    req.session.set('user', {
      email: 'john.doe@example.com',
      accessToken: 'your-access-token',
      coverPhoto: 'https://example.com/cover-photo.jpg',
      firstName: 'John',
      lastName: 'Doe',
    });
    return res.status(HttpStatus.OK).send({ data: req.session.get('user') });
  }

  @Get('guard')
  @UseGuards(AuthGuard)
  getUserInfo(@Res() res: FastifyReply) {
    return res.send({ msg: 'This route is guarded' });
  }
}
