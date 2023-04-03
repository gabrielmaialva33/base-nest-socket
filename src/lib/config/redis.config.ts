import { registerAs } from '@nestjs/config';
import * as URL from 'url-parse';

import { Env } from '@src/lib/config/env';

const url = new URL(Env.REDIS_URL);

export const redis = registerAs('redis', () => ({
  url: Env.REDIS_URL,
  ttl: +Env.REDIS_TTL,
  host: url.hostname || Env.REDIS_HOST,
  port: url.port || +Env.REDIS_PORT,
  user: url.username || Env.REDIS_USER,
  password: url.password || Env.REDIS_PASSWORD,
}));
