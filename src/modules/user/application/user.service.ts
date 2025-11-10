import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { PrismaSelectObject } from '@common/types/common.type';
import { UserRepository } from '@modules/user/infrastructure/user.repository';
import { PaginationMeta } from '@graphql/graphql-types';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  PaginatedUsers,
} from '@modules/user/presentation/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string, select: PrismaSelectObject): Promise<User> {
    const user = await this.userRepository.findOne(id, select);

    if (!user) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }

    return plainToInstance(User, user);
  }

  async findAll(select?: PrismaSelectObject): Promise<User[]> {
    const items = await this.userRepository.findAll(select);
    return plainToInstance(User, items);
  }

  async findPaginated(
    page: number,
    limit: number,
    select?: PrismaSelectObject,
  ): Promise<PaginatedUsers> {
    const result = (await this.userRepository.findPaginated(page, limit, select)) as [
      unknown[],
      number,
    ];
    const [items, total] = result;
    const transformedItems = plainToInstance(User, items);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const meta: PaginationMeta = {
      total,
      page,
      pageSize: limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };

    return {
      items: transformedItems,
      meta,
    };
  }

  async create(input: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(input);
    return plainToInstance(User, user);
  }

  async update(id: string, input: UpdateUserDto): Promise<User> {
    const exists = await this.userRepository.exists(id);

    if (!exists) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }

    const user = await this.userRepository.update(id, input);
    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<User> {
    const exists = await this.userRepository.exists(id);

    if (!exists) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }

    const user = await this.userRepository.delete(id);
    return plainToInstance(User, user);
  }
}
