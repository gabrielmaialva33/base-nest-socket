import 'dotenv/config';

import { ValidateSchema } from '@src/lib/config/validate';

export const Env = ValidateSchema.parse(process.env);
