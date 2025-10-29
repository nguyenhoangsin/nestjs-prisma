import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { UserPayload } from './auth-types';

/**
 * Custom decorator to extract the user object from the request.
 * This is useful for retrieving the authenticated user's details inside controllers.
 *
 * @example
 * ```typescript
 * @Get()
 * example(@User() user: UserPayload) {}
 * ```
 */
export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): UserPayload => {
  const request = ctx.switchToHttp().getRequest<{ user?: UserPayload }>();

  if (!request.user) {
    throw new UnauthorizedException(CUSTOM_HTTP_STATUS.UNAUTHORIZED);
  }

  return request.user;
});
