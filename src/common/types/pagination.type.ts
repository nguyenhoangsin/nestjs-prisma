import { InputType, ObjectType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsInt, Min } from 'class-validator';

// Base pagination DTO (for REST)
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}

// GraphQL Input Types
@InputType()
export class PaginationInput extends PaginationDto {
  @Field(() => Int)
  declare page: number;

  @Field(() => Int)
  declare limit: number;
}

// Pagination meta (REST & GraphQL)
@ObjectType()
export class PaginationMeta {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}

// Paginated response interface
export interface IPaginated<T> {
  items: T[];
  meta: PaginationMeta;
}
