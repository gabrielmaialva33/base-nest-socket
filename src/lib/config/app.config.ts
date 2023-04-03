import { registerAs } from '@nestjs/config';

import { Env } from '@src/lib/config/env';

export const app = registerAs('app', () => ({
  host: Env.APP_HOST,
  port: Env.APP_PORT,
  url: `${Env.APP_HOST}:${Env.APP_PORT}`,
  prefix: Env.APP_PREFIX,
  client_url: Env.CLIENT_URL,
}));
