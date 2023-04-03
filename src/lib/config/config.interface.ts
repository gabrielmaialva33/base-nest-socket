import { ConfigType } from '@nestjs/config';

import { app, redis } from '@src/lib/config';

export interface IConfig {
  app: ConfigType<typeof app>;
  redis: ConfigType<typeof redis>;
}
