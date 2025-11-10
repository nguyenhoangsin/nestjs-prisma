import { InputType, ObjectType, Field, Int } from '@nestjs/graphql';
import { PaginationDto, PaginationMeta as CommonPaginationMeta } from '@common/dtos/common.dto';

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

@InputType()
export class PaginationInput extends PaginationDto {
  @Field(() => Int)
  declare page: number;

  @Field(() => Int)
  declare limit: number;
}

@ObjectType()
export class PaginationMeta extends CommonPaginationMeta {
  @Field(() => Int)
  declare total: number;
  @Field(() => Int)
  declare page: number;
  @Field(() => Int)
  declare pageSize: number;
  @Field(() => Int)
  declare totalPages: number;
  @Field(() => Boolean)
  declare hasNextPage: boolean;
  @Field(() => Boolean)
  declare hasPreviousPage: boolean;
}
