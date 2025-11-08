import { Resolver, Query, Mutation, ID, Args, ResolveField, Parent } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { PrismaSelectObject } from '@common/types/common.type';
import { SelectFields } from '@common/decorators/select-fields.decorator';
import { UserService } from '@modules/user/application/user.service';
import { PrismaService } from '@database/prisma/prisma.service';
import {
  User,
  UserAppSetting,
  CreateUserInput,
  UpdateUserInput,
} from '@modules/user/presentation/user.dto';
import { DataLoaderService, DataLoaderKey } from '@shared/data-loader.service';

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

  @Query(() => User)
  getUser(
    @Args('id', { type: () => ID }) id: string,
    @SelectFields(User) select: PrismaSelectObject,
  ): Promise<User> {
    return this.userService.findOne(id, select);
  }

  @Query(() => [User])
  async getUsers(@SelectFields(User) select: PrismaSelectObject): Promise<User[]> {
    const users = await this.prisma.client.user.findMany({
      where: {},
      orderBy: {
        createdAt: 'desc',
      },
      ...select,
    });
    return users as unknown as User[];
  }

  @ResolveField(() => [UserAppSetting])
  async appSettings(
    @Parent() user: User,
    @SelectFields(UserAppSetting) select: PrismaSelectObject,
  ): Promise<UserAppSetting[]> {
    return this.appSettingsLoader.load({ key: user.id, prismaSelect: select });
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
