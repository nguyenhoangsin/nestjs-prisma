import { PartialType } from '@nestjs/mapped-types';
import { InputType, ObjectType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { IsOptional, IsEmail, IsString, IsEnum, MaxLength, IsArray, IsUUID } from 'class-validator';
import { IPaginated } from '@common/interfaces/common.interface';
import { Passthrough } from '@common/decorators/passthrough.decorator';
import { Virtual } from '@common/decorators/virtual.decorator';
import { Base64Text } from '@common/decorators/base64-text.decorator';
import { Role } from '@auth/auth-types';
import { PaginationMeta } from '@graphql/graphql-types';
import { PaginationDto } from '@common/dtos/common.dto';
import { UserIncludeOption } from '@modules/user/presentation/user-types';

export class UserQueryDto {
  @IsOptional()
  @IsEnum(UserIncludeOption)
  include?: UserIncludeOption;
}

export class UsersQueryDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsEnum(UserIncludeOption, { each: true })
  include?: UserIncludeOption | UserIncludeOption[];
}

export class CreateUserDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Base64Text()
  name?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class DeleteUsersDto {
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}

@InputType()
export class CreateUserInput extends CreateUserDto {
  @Field(() => String)
  declare email: string;

  @Field(() => String, { nullable: true })
  declare name?: string;

  @Field(() => Role, { nullable: true })
  declare role?: Role;
}

@InputType()
export class UpdateUserInput extends GqlPartialType(CreateUserInput) {}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Role)
  role: Role;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Virtual()
  @Field(() => [UserAppSetting], { nullable: true })
  appSettings?: UserAppSetting[] | null;
}

@ObjectType()
export class UserAppSetting {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  appId: string;

  @Field(() => String, { nullable: true })
  preferences?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class PaginatedUsers implements IPaginated<User> {
  @Passthrough()
  @Field(() => [User])
  items: User[];

  @Virtual()
  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
