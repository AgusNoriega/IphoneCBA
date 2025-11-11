import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // Logs a stdout: no usamos $on para evitar TS2345
      log: [
        { level: 'query', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Hook nativo de Node para cierre limpio
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
