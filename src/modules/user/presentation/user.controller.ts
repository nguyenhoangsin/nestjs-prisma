import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrismaSelectObject } from '@common/types/common.type';
import { toPrismaSelect } from '@common/utils/prisma-query.util';
import { UserService } from '@modules/user/application/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  UserAppSetting,
} from '@modules/user/presentation/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Query('include') include?: string) {
    const userSelect = toPrismaSelect(User);
    const select: PrismaSelectObject = {
      select: {
        ...userSelect.select,
      },
    };
    // GET /user/:id?include=appSettings
    if (include) {
      const includes = include.split(',').map(i => i.trim());

      if (includes.includes('appSettings')) {
        const appSettingsSelect = toPrismaSelect(UserAppSetting);
        select.select.appSettings = appSettingsSelect;
      }
    }
    return this.userService.findOne(id, select);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
