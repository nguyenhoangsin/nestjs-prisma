import { Prisma } from '@prisma/client';
import { PrismaSelectObject } from '@common/types/common.type';

export enum UserIncludeOption {
  APP_SETTINGS = 'appSettings',
}

export type UserQueryOptions = {
  select?: Record<string, true | PrismaSelectObject>;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
};
