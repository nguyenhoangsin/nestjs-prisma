import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

/**
 * Gets the request object from either HTTP or GraphQL context.
 *
 * @param context - The execution context from NestJS
 * @returns The Express request object (or custom type if T is provided)`
 */
export function getRequest<T = Request>(context: ExecutionContext): T {
  const contextType = context.getType<'http' | 'graphql'>();

  if (contextType === 'http') {
    return context.switchToHttp().getRequest<T>();
  }

  if (contextType === 'graphql') {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext<{ req: T }>().req;
  }

  throw new Error(`Unsupported context type: ${String(contextType)}`);
}
