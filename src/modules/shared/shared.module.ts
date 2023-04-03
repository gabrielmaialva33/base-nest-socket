import { Module } from '@nestjs/common';

import { HealthModule } from '@src/modules/health/health.module';

@Module({
  imports: [HealthModule],
})
export class SharedModule {}
