import { PartialType } from '@nestjs/mapped-types';
import { InputType, ObjectType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { IsOptional, IsEmail, IsString, IsEnum, MaxLength } from 'class-validator';
import { Base64TextScalar } from '@graphql/graphql-scalars';
import { Virtual } from '@common/decorators/virtual.decorator';
import { Base64Text } from '@common/decorators/base64-text.decorator';
import { Role } from '@auth/auth-types';

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

@InputType()
export class CreateUserInput extends CreateUserDto {
  @Field(() => String)
  declare email: string;

  @Field(() => String, { nullable: true })
  declare name?: string;

  @Field(() => Role, { nullable: true })
  declare role?: Role;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
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

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | null;

  @Virtual()
  @Field(() => String, { nullable: true })
  virtualField?: string | null;
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

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | null;
}
