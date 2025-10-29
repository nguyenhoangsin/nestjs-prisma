import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateUserInput, UpdateUserInput, User } from '@modules/user/presentation/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.client.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user as unknown as User;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.client.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users as unknown as User[];
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prisma.client.user.create({
      data: {
        email: input.email,
        name: input.name ?? null,
        role: input.role as 'ADMIN' | 'USER',
        deletedAt: input.deletedAt ?? null,
      },
    });

    return user as unknown as User;
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const existingUser = await this.prisma.client.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData: {
      email?: string;
      name?: string | null;
      role?: 'ADMIN' | 'USER';
      deletedAt?: Date | null;
    } = {};
    if (input.email !== undefined) updateData.email = input.email;
    if (input.name !== undefined) updateData.name = input.name ?? null;
    if (input.role !== undefined) updateData.role = input.role as 'ADMIN' | 'USER';
    if (input.deletedAt !== undefined) updateData.deletedAt = input.deletedAt ?? null;

    const user = await this.prisma.client.user.update({
      where: { id },
      data: updateData,
    });

    return user as unknown as User;
  }

  async remove(id: string): Promise<User> {
    const existingUser = await this.prisma.client.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const user = await this.prisma.client.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return user as unknown as User;
  }
}
