import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaSelectObject } from '@common/types/common.type';
import { IRepository } from '@common/interfaces/repository.interface';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, User } from '@modules/user/presentation/user.dto';

@Injectable()
export class UserRepository implements IRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string, options?: PrismaSelectObject) {
    return this.prisma.client.user.findUnique({
      where: {
        id,
      },
      ...(options || {}),
    });
  }

  findAll(options?: PrismaSelectObject) {
    const queryOptions = {
      where: {} as Prisma.UserWhereInput,
      orderBy: {
        createdAt: 'desc' as const,
      },
    };

    return this.prisma.client.user.findMany({
      ...queryOptions,
      ...(options || {}),
    });
  }

  findPaginated(page: number, limit: number, options?: PrismaSelectObject) {
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
        ...(options || {}),
      }),
      this.prisma.client.user.count(),
    ]);
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.client.user.create({
      data: dto as Prisma.UserCreateInput,
    });

    return user;
  }

  async createMany(dtos: CreateUserDto[]) {
    return this.prisma.client.user.createMany({
      data: dtos as Prisma.UserCreateManyInput[],
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.client.user.update({
      where: { id },
      data: dto as Prisma.UserUpdateInput,
    });

    return user;
  }

  async updateMany(updates: Array<{ id: string; dto: UpdateUserDto }>) {
    if (updates.length === 0) {
      return [];
    }

    const values: unknown[] = [];
    const valueRows: string[] = [];
    let paramIndex = 1;

    updates.forEach(({ id, dto }) => {
      const buildParam = (value: unknown, type: string): string => {
        if (value !== undefined) {
          values.push(value);
          return `$${paramIndex++}::${type}`;
        }
        return 'NULL';
      };

      // Push id first to match parameter order
      values.push(id);
      const row = [
        `$${paramIndex++}::uuid`, // id
        buildParam(dto.email, 'varchar'),
        buildParam(dto.name, 'varchar'), // undefined → NULL, null → parameter
        buildParam(dto.role, '"Role"'),
      ];
      valueRows.push(`(${row.join(', ')})`);
    });

    const query = `
      UPDATE users u
      SET
        email = COALESCE(v.email, u.email),
        name = COALESCE(v.name, u.name),
        role = COALESCE(v.role, u.role),
        updated_at = NOW()
      FROM (VALUES ${valueRows.join(', ')}) AS v(id, email, name, role)
      WHERE u.id = v.id
      RETURNING u.*
    `;

    return this.prisma.client.$queryRawUnsafe<User[]>(query, ...values);
  }

  async upsert(where: Prisma.UserWhereUniqueInput, dto: CreateUserDto) {
    return this.prisma.client.user.upsert({
      where,
      update: dto as Prisma.UserUpdateInput,
      create: dto as Prisma.UserCreateInput,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.client.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return user;
  }

  async deleteMany(ids: string[]) {
    return this.prisma.client.user.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string) {
    return this.prisma.client.user.update({
      where: { id },
      data: {
        deletedAt: null,
      },
    });
  }
  // restore(id: string) {}

  async count(options?: { where?: Prisma.UserWhereInput }) {
    return this.prisma.client.user.count({
      where: options?.where || {},
    });
  }

  async exists(id: string, options?: { where?: Prisma.UserWhereInput }) {
    const count = await this.prisma.client.user.count({
      where: {
        id,
        ...(options?.where || {}),
      },
    });
    return count > 0;
  }
}
