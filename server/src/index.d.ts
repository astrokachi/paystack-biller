/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest } from 'fastify';
import fastifySecureSession from '@fastify/secure-session';
import { User } from './user/entities/user.entity';

export interface Tokens {
  access_token: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  id_token?: string;
  expiry_date?: number;
}

interface CustomSessionData {
  user?: Partial<User>;
  tokens?: Tokens;
  authenticated: boolean;
}

declare module '@fastify/secure-session' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SessionData extends CustomSessionData {}
}

declare module 'fastify' {
  interface FastifyRequest {
    session: CustomSessionData;
  }
}
