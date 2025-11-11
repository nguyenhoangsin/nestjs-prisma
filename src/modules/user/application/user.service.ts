import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { PrismaSelectObject } from '@common/types/common.type';
import { toPrismaSelect } from '@common/utils/prisma-query.util';
import { UserRepository } from '@modules/user/infrastructure/user.repository';
import { PaginationMeta } from '@graphql/graphql-types';
import { UserIncludeOption, UserQueryOptions } from '@modules/user/presentation/user-types';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  PaginatedUsers,
  UserAppSetting,
} from '@modules/user/presentation/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string, select: PrismaSelectObject): Promise<User> {
    const queryOptions: UserQueryOptions = select ? { select: select.select } : {};
    const user = await this.userRepository.findOne(id, queryOptions);

    if (!user) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }

    return plainToInstance(User, user);
  }

  async findAll(select?: PrismaSelectObject): Promise<User[]> {
    const queryOptions: UserQueryOptions = select ? { select: select.select } : {};
    const items = await this.userRepository.findAll(queryOptions);
    return plainToInstance(User, items);
  }

  async findPaginated(
    page: number,
    limit: number,
    select?: PrismaSelectObject,
  ): Promise<PaginatedUsers> {
    const queryOptions: UserQueryOptions = select ? { select: select.select } : {};
    const result = (await this.userRepository.findPaginated(page, limit, queryOptions)) as [
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

  async create(dto: CreateUserDto, select?: PrismaSelectObject): Promise<User> {
    const emailExists = await this.userRepository.emailExists(dto.email);

    if (emailExists) {
      throw new ConflictException(CUSTOM_HTTP_STATUS.CONFLICT);
    }

    const queryOptions: UserQueryOptions = select ? { select: select.select } : {};
    const user = await this.userRepository.create(dto, queryOptions);
    return plainToInstance(User, user);
  }

  async update(id: string, dto: UpdateUserDto, select?: PrismaSelectObject): Promise<User> {
    const exists = await this.userRepository.existsById(id);

    if (!exists) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }

    if (dto.email) {
      const emailExists = await this.userRepository.emailExists(dto.email, id);

      if (emailExists) {
        throw new ConflictException(CUSTOM_HTTP_STATUS.CONFLICT);
      }
    }

    const queryOptions: UserQueryOptions = select ? { select: select.select } : {};
    const user = await this.userRepository.update(id, dto, queryOptions);
    return plainToInstance(User, user);
  }

  async remove(id: string, select?: PrismaSelectObject): Promise<User> {
    const exists = await this.userRepository.existsById(id);

    if (!exists) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }
    const queryOptions: UserQueryOptions = select ? { select: select.select } : {};
    const user = await this.userRepository.remove(id, queryOptions);
    return plainToInstance(User, user);
  }

  async removeMany(ids: string[]): Promise<{ count: number }> {
    if (ids.length === 0) {
      return { count: 0 };
    }

    const existingIds = await this.userRepository.existsByIds(ids);

    if (existingIds.length !== ids.length) {
      throw new NotFoundException(CUSTOM_HTTP_STATUS.NOT_FOUND);
    }

    return this.userRepository.removeMany(ids);
  }

  /**
   * Builds Prisma select object for User with optional includes
   * @param include - String or array of strings
   * @example
   * URL: GET /users?include=appSettings
   * buildUserSelect("appSettings")
   *
   * URL: GET /users?include=appSettings,otherOption
   * buildUserSelect("appSettings,otherOption")
   *
   * URL: GET /users?include=appSettings&include=otherOption
   * buildUserSelect(["appSettings", "otherOption"])
   */
  buildUserSelect(include?: UserIncludeOption | UserIncludeOption[]): PrismaSelectObject {
    const userSelect = toPrismaSelect(User);
    const select: PrismaSelectObject = {
      select: {
        ...userSelect.select,
      },
    };

    if (include) {
      const includes = Array.isArray(include)
        ? include.map(i => i.trim())
        : include.split(',').map(i => i.trim());

      if (includes.includes('appSettings')) {
        const appSettingsSelect = toPrismaSelect(UserAppSetting);
        select.select.appSettings = appSettingsSelect;
      }
    }

    return select;
  }
}
