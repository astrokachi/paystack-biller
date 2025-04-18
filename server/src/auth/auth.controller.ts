import {
  Controller,
  Get,
  Req,
  Res,
  // UseGuards
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
  @Get()
  getSomething(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.send();
  }
}
