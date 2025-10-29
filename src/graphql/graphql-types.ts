import { ObjectType, Field, Int } from '@nestjs/graphql';

/**
 * Pagination Meta Information
 * Type dùng chung cho nhiều modules (User, Post, Comment...)
 * Đặt trong graphql/types vì được sử dụng across modules
 */
@ObjectType()
export class PaginationMeta {
  @Field(() => Int, { description: 'Total number of items' })
  total: number;

  @Field(() => Int, { description: 'Current page number' })
  page: number;

  @Field(() => Int, { description: 'Number of items per page' })
  pageSize: number;

  @Field(() => Int, { description: 'Total number of pages' })
  totalPages: number;

  @Field(() => Boolean, { description: 'Whether there is a next page' })
  hasNextPage: boolean;

  @Field(() => Boolean, { description: 'Whether there is a previous page' })
  hasPreviousPage: boolean;
}

/**
 * Generic Paginated Response
 * Wrapper cho các list responses có pagination
 */
@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;
}
