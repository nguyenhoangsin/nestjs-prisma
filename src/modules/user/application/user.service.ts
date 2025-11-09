import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { PrismaSelectObject } from '@common/types/common.type';
import { UserRepository } from '@modules/user/infrastructure/user.repository';
import { PaginationInput, PaginationMeta } from '@graphql/graphql-types';
import {
  CreateUserInput,
  UpdateUserInput,
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

  async findManyPaginated(
    pagination: PaginationInput,
    select?: PrismaSelectObject,
  ): Promise<PaginatedUsers> {
    const [items, total] = await this.userRepository.findManyPaginated(pagination, select);
    const transformedItems = plainToInstance(User, items);

    const { page, limit } = pagination;
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

  async findAll(select?: PrismaSelectObject): Promise<User[]> {
    const items = await this.userRepository.findAll(select);
    return plainToInstance(User, items);
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(input);
    return plainToInstance(User, user);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    // const existingUser = await this.userRepository.findOne(id);

    // if (!existingUser) {
    //   throw new NotFoundException(`User with ID ${id} not found`);
    // }

    const user = await this.userRepository.update(id, input);
    return plainToInstance(User, user);
  }

  async remove(id: string): Promise<User> {
    // const existingUser = await this.userRepository.findOne(id);

    // if (!existingUser) {
    //   throw new NotFoundException(`User with ID ${id} not found`);
    // }

    const user = await this.userRepository.softDelete(id);
    return plainToInstance(User, user);
  }
}
