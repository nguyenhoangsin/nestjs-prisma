import { InputType, Field } from '@nestjs/graphql';

// GraphQL Input Types for querying
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
