import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IRepository } from '@common/types/repository.type';
import { PrismaService } from '@database/prisma/prisma.service';
import {
  UserQueryOptions,
  CreateUserDto,
  UpdateUserDto,
} from '@modules/user/presentation/user.type';

@Injectable()
export class UserRepository implements IRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string, options?: UserQueryOptions) {
    return this.prisma.client.user.findUnique({
      where: {
        id,
      },
      ...(options?.select ? { select: options.select } : {}),
    });
  }

  findAll(options?: UserQueryOptions) {
    const queryOptions = {
      where: {} as Prisma.UserWhereInput,
      orderBy: {
        createdAt: 'desc' as const,
      },
    };

    return this.prisma.client.user.findMany({
      ...queryOptions,
      ...(options?.select ? { select: options.select } : {}),
    });
  }

  findPaginated(page: number, limit: number, options?: UserQueryOptions) {
    const skip = (page - 1) * limit;

    const queryOptions = {
      where: {} as Prisma.UserWhereInput,
      orderBy: {
        createdAt: 'desc' as const,
      },
      skip,
      take: limit,
    };

    return this.prisma.client.$transaction([
      this.prisma.client.user.findMany({
        ...queryOptions,
        ...(options?.select ? { select: options.select } : {}),
      }),
      this.prisma.client.user.count(),
    ]);
  }

  async create(dto: CreateUserDto, options?: UserQueryOptions) {
    const user = await this.prisma.client.user.create({
      data: dto as Prisma.UserCreateInput,
      ...(options?.select ? { select: options.select } : {}),
    });

    return user;
  }

  async update(id: string, dto: UpdateUserDto, options?: UserQueryOptions) {
    const user = await this.prisma.client.user.update({
      where: { id },
      data: dto as Prisma.UserUpdateInput,
      ...(options?.select ? { select: options.select } : {}),
    });

    return user;
  }

  async remove(id: string, options?: UserQueryOptions) {
    const deletedAt = new Date();

    return this.prisma.client.$transaction(async tx => {
      // Soft delete all child records
      // updateMany doesn't support select - it only returns { count: number }
      await tx.userAppSetting.updateMany({
        where: {
          userId: id,
          deletedAt: null,
        },
        data: {
          deletedAt,
        },
      });

      const user = await tx.user.update({
        where: { id },
        data: {
          deletedAt,
        },
        ...(options?.select ? { select: options.select } : {}),
      });

      return user;
    });
  }

  async removeMany(ids: string[]) {
    const deletedAt = new Date();

    return this.prisma.client.$transaction(async tx => {
      // Soft delete all child records for all users
      // updateMany doesn't support select - it only returns { count: number }
      await tx.userAppSetting.updateMany({
        where: {
          userId: { in: ids },
          deletedAt: null,
        },
        data: {
          deletedAt,
        },
      });

      // Soft delete users
      return tx.user.updateMany({
        where: {
          id: { in: ids },
        },
        data: {
          deletedAt,
        },
      });
    });
  }

  async existsById(id: string) {
    const user = await this.prisma.client.user.findFirst({
      where: { id },
      select: { id: true },
    });
    return !!user;
  }

  async existsByIds(ids: string[]) {
    const users = await this.prisma.client.user.findMany({
      where: {
        id: { in: ids },
        deletedAt: null,
      },
      select: { id: true },
    });
    return users.map(user => user.id);
  }

  /**
   * @param email - Email to check
   * @param excludeId - ID to exclude from check (useful for update operations)
   */
  async emailExists(email: string, excludeId?: string) {
    const where: Prisma.UserWhereInput = {
      email,
    };

    if (excludeId) {
      where.id = { not: excludeId };
    }

    const user = await this.prisma.client.user.findFirst({
      where,
      select: { id: true },
    });
    return !!user;
  }
}
