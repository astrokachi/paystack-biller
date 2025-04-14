import { Controller, Get, Req, Res } from '@nestjs/common';
import { RouteConfig } from '@nestjs/platform-fastify';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  @RouteConfig({ msg: 'hello world' })
  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    return res.send({ msg: 'hello world' });
  }
}
