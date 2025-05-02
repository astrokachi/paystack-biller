export const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    sessionName: process.env.SESSION_NAME || 'session',
    sessionSecret: process.env.SESSION_SECRET || '',
    sessionSalt: process.env.SESSION_SALT || '',
  },
  db: {
    url: process.env.DB_SERVER || '',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || '',
  },
  paystack: {
    secretKey: process.env.PAYSTACK_TEST_SECRET_KEY || '',
    url: process.env.PAYSTACK_BASE_URL || '',
  },
};

export type Config = typeof config;
