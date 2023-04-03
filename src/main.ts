import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import helmet from '@fastify/helmet';
import compression from '@fastify/compress';

import { AppModule } from '@src/app.module';
import { SocketIOAdapter } from '@src/socket-io.adapter';
import { IConfig } from '@src/lib/config';

import { AppUtils } from '@src/common/helpers/app.utils';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { bufferLogs: true },
  );

  AppUtils.killAppWithGrace(app);

  const configService = app.get(ConfigService<IConfig, true>);

  /**
   * ------------------------------------------------------
   * Security
   * ------------------------------------------------------
   */
  await app.register(helmet);
  await app.register(compression);

  /**
   * ------------------------------------------------------
   * WebSocket Config
   * ------------------------------------------------------
   */
  const redisIOAdapter = new SocketIOAdapter(app, configService);
  await redisIOAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIOAdapter);

  /**
   * ------------------------------------------------------
   * Global Config
   * ------------------------------------------------------
   */
  app.enableCors();
  app.enableShutdownHooks();

  const { host, port } = configService.get('app');

  await app
    .listen(port, host)
    .then(async () =>
      Logger.log(
        `Application is running on: ${await app.getUrl()}`,
        'Bootstrap',
      ),
    );
}

(async () => await bootstrap())();
