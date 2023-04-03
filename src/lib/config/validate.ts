import * as process from 'process';

import { z } from 'zod';
import { Logger } from '@nestjs/common';

export const ValidateSchema = z.object({
  // APP
  APP_HOST: z.string().trim().default('127.0.0.1'),
  APP_PORT: z
    .string()
    .trim()
    .default('80')
    .transform((value) => Number(value)),
  APP_PREFIX: z.string().trim().default('api'),
  CLIENT_URL: z.string().trim().default('http://localhost:3000'),
  // REDIS
  REDIS_TTL: z.string().trim().min(1).default('10').optional(),
  REDIS_URL: z
    .string()
    .trim()
    .min(1)
    .default('redis://default:redis@localhost:6379')
    .optional(),
  REDIS_HOST: z.string().trim().min(1).default('localhost').optional(),
  REDIS_PORT: z
    .string()
    .trim()
    .min(1)
    .default('6379')
    .transform((value) => Number(value))
    .optional(),
  REDIS_USER: z.string().trim().min(1).default('default').optional(),
  REDIS_PASSWORD: z.string().trim().min(1).default('redis').optional(),
});

export function validate(config: Record<string, unknown>) {
  const result: any = ValidateSchema.safeParse(config);

  if (!result.success) {
    for (const { message, path } of result.error.issues)
      Logger.error(message, path.join('.'));
    process.exit(1);
  }

  return result.data;
}
