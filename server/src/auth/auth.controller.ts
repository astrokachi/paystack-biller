import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  // Req,
  UseGuards,
} from '@nestjs/common';
import { RedirectGuard } from './guards/redirect.guard';
import {
  FastifyReply,
  // FastifyRequest
} from 'fastify';
import { GoogleAuthService } from './config/google.auth.service';
import { AuthService } from './auth.service';

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
  async verifyCode(@Query('code') code: string, @Res() res: FastifyReply) {
    const tokensAndUserInfo =
      await this.googleAuthService.getTokensAndUserInfo(code);
    const user = await this.authService.saveUser(
      tokensAndUserInfo.user,
      tokensAndUserInfo.tokens,
    );

    if (user)
      res.status(HttpStatus.OK).send({
        msg: 'User added successfully',
        data: user,
      });
  }
}
