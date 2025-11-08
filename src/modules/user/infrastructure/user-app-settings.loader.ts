import { Injectable, Scope } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { groupBy } from 'lodash';
import { PrismaService } from '@database/prisma/prisma.service';
import { PrismaSelectObject } from '@common/types/common.type';
import { UserAppSetting } from '@modules/user/presentation/user.dto';

interface LoaderKey {
  userId: string;
  prismaSelect: PrismaSelectObject;
}

@Injectable({ scope: Scope.REQUEST })
export class UserAppSettingsLoader extends DataLoader<LoaderKey, UserAppSetting[], string> {
  constructor(private readonly prisma: PrismaService) {
    super(
      async (keys: LoaderKey[]) => {
        if (keys.length === 0) return [];

        // Collect all unique userIds
        const userIds = [...new Set(keys.map(k => k.userId))];

        // Merge all select fields from all keys
        const mergedSelect: Record<string, true> = { userId: true };
        keys.forEach(key => {
          if (key.prismaSelect?.select) {
            Object.keys(key.prismaSelect.select).forEach(field => {
              mergedSelect[field] = true;
            });
          }
        });

        // Query all appSettings for all users in a single query
        const appSettings = await this.prisma.client.userAppSetting.findMany({
          where: {
            userId: { in: userIds },
          },
          select: mergedSelect,
        });

        // Group by userId: returns Record<string, T[]> where key is userId
        const grouped = groupBy(appSettings, 'userId');
        return keys.map(key => plainToInstance(UserAppSetting, grouped[key.userId]) ?? []);
      },
      {
        // Cache by userId only since we merge all select fields in batch function
        cacheKeyFn: (key: LoaderKey) => key.userId,
      },
    );
  }
}
