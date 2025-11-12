import { Resolver, Query, Mutation, ID, Args, ResolveField, Parent } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { PrismaSelectObject } from '@common/types/common.type';
import { SelectFields } from '@common/decorators/select-fields.decorator';
import { PrismaService } from '@database/prisma/prisma.service';
import { PaginationInput } from '@graphql/graphql-types';
import { Public } from '@auth/public.decorator';
import { DataLoaderService, DataLoaderKey } from '@shared/data-loader.service';
import {
  User,
  UserAppSetting,
  CreateUserInput,
  UpdateUserInput,
  PaginatedUsers,
} from '@modules/user/presentation/user.dto';
import { UserService } from '@modules/user/application/user.service';

@Resolver(() => User)
export class UserResolver {
  private readonly appSettingsLoader: DataLoader<DataLoaderKey<string>, UserAppSetting[], string>;

  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly dataLoaderService: DataLoaderService,
  ) {
    this.appSettingsLoader = this.dataLoaderService.createLoader<string, UserAppSetting>({
      delegate: this.prisma.client.userAppSetting,
      foreignKey: 'userId',
      modelClass: UserAppSetting,
    });
  }

  /**
   * Get a user by id
   * @param id - User id
   * @param select - Prisma select object
   * @returns User
   */
  @Public()
  @Query(() => User)
  user(
    @Args('id', { type: () => ID }) id: string,
    @SelectFields(User) select: PrismaSelectObject,
  ): Promise<User> {
    return this.userService.findOne(id, select);
  }

  /**
   * Get all users
   * @param select - Prisma select object
   * @returns All users
   */
  @Query(() => [User])
  async allUsers(@SelectFields(User) select: PrismaSelectObject): Promise<User[]> {
    return this.userService.findAll(select);
  }

  /**
   * Get paginated users
   * @param pagination - Pagination input (page, limit)
   * @param select - Prisma select object
   * @returns Paginated users with metadata
   */
  @Query(() => PaginatedUsers)
  async users(
    @Args('pagination', { type: () => PaginationInput })
    pagination: PaginationInput,
    @SelectFields(PaginatedUsers) select: PrismaSelectObject,
  ): Promise<PaginatedUsers> {
    return this.userService.findPaginated(pagination.page, pagination.limit, select);
  }

  /**
   * Create a new user
   * @param input - User input data
   * @param select - Prisma select object
   * @returns Created user
   */
  @Mutation(() => User)
  createUser(
    @Args('input') input: CreateUserInput,
    @SelectFields(User) select: PrismaSelectObject,
  ): Promise<User> {
    return this.userService.create(input, select);
  }

  /**
   * Update a user by id
   * @param id - User id
   * @param input - User input data
   * @param select - Prisma select object
   * @returns Updated user
   */
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
    @SelectFields(User) select: PrismaSelectObject,
  ): Promise<User> {
    return this.userService.update(id, input, select);
  }

  /**
   * Delete a user by id (soft delete with all child records)
   * @param id - User id
   * @param select - Prisma select object
   * @returns Deleted user
   */
  @Mutation(() => User)
  deleteUser(
    @Args('id', { type: () => ID }) id: string,
    @SelectFields(User) select: PrismaSelectObject,
  ): Promise<User> {
    return this.userService.remove(id, select);
  }

  /**
   * Delete multiple users by ids (soft delete with all child records)
   * @param ids - Array of user ids
   * @returns Count of deleted users
   */
  @Mutation(() => Number)
  deleteUsers(@Args('ids', { type: () => [ID] }) ids: string[]): Promise<number> {
    return this.userService.removeMany(ids).then(result => result.count);
  }

  /**
   * Get user app settings
   * @param user - Parent user object
   * @param select - Prisma select object
   * @returns User app settings
   */
  @ResolveField(() => [UserAppSetting])
  async appSettings(
    @Parent() user: User,
    @SelectFields(UserAppSetting) select: PrismaSelectObject,
  ): Promise<UserAppSetting[]> {
    return this.appSettingsLoader.load({ key: user.id, prismaSelect: select });
  }
}
