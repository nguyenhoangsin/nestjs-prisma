import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient;
  private readonly logger = new Logger(PrismaService.name);
  private readonly modelNames: Record<string, boolean> = Object.keys(Prisma.ModelName).reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {},
  );

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });

    this.client = this.$extends(
      createSoftDeleteExtension({
        models: this.modelNames,
        defaultConfig: {
          field: 'deletedAt',
          createValue: deleted => (deleted ? new Date() : null),
          allowToOneUpdates: true,
          allowCompoundUniqueIndexWhere: true,
        },
      }),
    ) as PrismaClient;
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected');
  }
}
