import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { IConfig } from '@src/lib/config';

import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
export class SocketIOAdapter extends IoAdapter {
  private adapterConstructor: any;

  constructor(
    app: INestApplicationContext,
    private readonly config: ConfigService<IConfig, true>,
  ) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: this.config.get('redis.url', { infer: true }),
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }
  createIOServer(port: number, options?: ServerOptions): any {
    const clientUrl = this.config.get('app.client_url', { infer: true });
    const cors = { origin: [clientUrl] };

    const optionsWithCORS: ServerOptions = { ...options, cors };

    const server: Server = super.createIOServer(port, optionsWithCORS);
    server.adapter(this.adapterConstructor);

    return server;
  }
}
