import { join } from 'path';
import { Request, Response } from 'express';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLScalarType } from 'graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { graphqlFormatError } from '@graphql/graphql-format-error';
import '@graphql/graphql-register-enum';
import { Environment } from '@common/types/enum.type';
import { Base64TextScalar } from '@graphql/scalars/base64-text.scalar';

export const resolverScalars: Record<string, GraphQLScalarType> = {
  JSON: GraphQLJSON,
};

export const graphqlScalars = [Base64TextScalar];

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/graphql/schema.generated.gql'),
  sortSchema: true,
  // resolvers: resolverScalars,
  formatError: graphqlFormatError,
  context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  playground: process.env.NODE_ENV !== Environment.production,
  introspection: process.env.NODE_ENV !== Environment.production,
};
