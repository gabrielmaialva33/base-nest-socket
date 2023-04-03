import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { validate, ValidateSchema } from '@src/lib/config/validate';
import { app } from '@src/lib/config/app.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [app],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: ValidateSchema,
      validate: validate,
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
