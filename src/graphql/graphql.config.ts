import { join } from 'path';
import { Request, Response } from 'express';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { graphqlFormatError } from '@graphql/graphql-format-error';
import { resolverScalars } from '@graphql/graphql-scalars';
import '@graphql/graphql-register-enum';
import { Environment } from '@common/enums/common.enum';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/graphql/schema.generated.gql'),
  sortSchema: false,
  // resolvers: resolverScalars,
  formatError: graphqlFormatError,
  context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
  playground: process.env.NODE_ENV !== Environment.production,
  introspection: process.env.NODE_ENV !== Environment.production,
};
