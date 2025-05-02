import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import 'dotenv/config';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import fastifySecureSession from '@fastify/secure-session';
import { config } from './config';
import { GlobalExceptionFilter } from './lib/filters/global-exception.filter';

async function bootstrap() {
  const PORT = config.app.port;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie);
  await app.register(fastifySecureSession, {
    sessionName: config.app.sessionName,
    secret: config.app.sessionSecret,
    salt: config.app.sessionSalt,
    cookie: {
      secure: config.app.env === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(PORT, '0.0.0.0', () => {
    console.log('server is listening on port ', PORT);
  });
}

void bootstrap();
