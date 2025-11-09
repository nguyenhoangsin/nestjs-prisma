import { Type } from '@nestjs/common';
import { InputType, ObjectType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @Field(() => Int)
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}

@InputType()
export class SortInput {
  @Field(() => String, { nullable: true })
  sortBy?: string;

  @Field(() => String, { nullable: true })
  sortOrder?: 'asc' | 'desc';
}

@InputType()
export class FilterInput {
  @Field(() => [String], { nullable: true })
  search?: string[];
}

@ObjectType()
export class PaginationMeta {
  @Field(() => Int) total: number;
  @Field(() => Int) page: number;
  @Field(() => Int) pageSize: number;
  @Field(() => Int) totalPages: number;
  @Field(() => Boolean) hasNextPage: boolean;
  @Field(() => Boolean) hasPreviousPage: boolean;
}
