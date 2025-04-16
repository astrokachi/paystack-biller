import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import 'dotenv/config';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const fastifyAdapter = new FastifyAdapter();
  await fastifyAdapter.register(fastifySecureSession, {
    secret: process.env.SESSION_SECRET!,
    salt: process.env.SESSION_SALT,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    },
  });

  await fastifyAdapter.register(fastifyPassport.initialize());
  await fastifyAdapter.register(fastifyPassport.secureSession());

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, '0.0.0.0', () => {
    console.log('server is listening on port ', PORT);
  });
}

void bootstrap();
