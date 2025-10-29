import { GraphQLScalarType } from 'graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { Base64TextScalar } from '@graphql/scalars/base64-text.scalar';

export { GraphQLJSON };
export { Base64TextScalar };

export const resolverScalars: Record<string, GraphQLScalarType> = {
  JSON: GraphQLJSON,
};
export const graphqlScalars = [Base64TextScalar];
