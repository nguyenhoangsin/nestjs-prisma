import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom parameter decorator to read cookies from the request.
 * Returns a cookie by name, or all cookies when no name is provided.
 *
 * @example
 * ```typescript
 * @Get('example')
 * example(@Cookies('example') example: string) {}
 * ```
 */
export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, string> | Nullable<string> => {
    const request = ctx.switchToHttp().getRequest<{ cookies: Record<string, string> }>();
    // If 'data' is provided, return the specific cookie, otherwise return all cookies
    return data ? request.cookies?.[data] : request.cookies;
  },
);
