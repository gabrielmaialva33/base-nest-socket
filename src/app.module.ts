import { Module } from '@nestjs/common';

import { NestConfigModule } from '@src/lib/config/config.module';
import { NestHttpModule } from '@src/lib/http/http.module';
import { SharedModule } from '@src/modules/shared/shared.module';

@Module({
  imports: [NestConfigModule, NestHttpModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
