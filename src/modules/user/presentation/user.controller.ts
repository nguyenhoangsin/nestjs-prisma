import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT,
} from '@common/constants/common.constant';
import { PrismaSelectObject } from '@common/types/common.type';
import {
  UserQueryDto,
  UsersQueryDto,
  CreateUserDto,
  UpdateUserDto,
  DeleteUsersDto,
  User,
  PaginatedUsers,
} from '@modules/user/presentation/user.dto';
import { UserService } from '@modules/user/application/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: UserQueryDto): Promise<User> {
    // GET /users/:id?include=appSettings
    const select = this.userService.buildUserSelect(query.include);
    return this.userService.findOne(id, select);
  }

  @Get()
  findAll(@Query() query: UsersQueryDto): Promise<User[] | PaginatedUsers> {
    const select = this.userService.buildUserSelect(query.include);

    if (query.page || query.limit) {
      return this.userService.findPaginated(
        query.page ?? PAGINATION_DEFAULT_PAGE,
        query.limit ?? PAGINATION_DEFAULT_LIMIT,
        select,
      );
    }

    return this.userService.findAll(select);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const select = this.userService.buildUserSelect();
    return this.userService.create(createUserDto, select);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const select = this.userService.buildUserSelect();
    return this.userService.update(id, updateUserDto, select);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const select: PrismaSelectObject = { select: { id: true, email: true, deletedAt: true } };
    return this.userService.remove(id, select);
  }

  @Post('bulk-delete')
  removeMany(@Body() deleteUsersDto: DeleteUsersDto): Promise<{ count: number }> {
    return this.userService.removeMany(deleteUsersDto.ids);
  }
}
