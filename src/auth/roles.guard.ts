import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { getRequest } from '@common/utils/execution-context.util';
import { ROLES_METADATA_KEY, Role, UserPayload } from '@auth/auth-types';

/**
 * Guard that enforces role-based access control for route handlers.
 * Checks if authenticated user has required roles from `@Roles()` decorator.
 *
 * @example
 * ```typescript
 * @Controller('example')
 * export class ExampleController {
 *   @UseGuards(RolesGuard)
 *   @Roles(Role.ROLE_1, Role.ROLE_2)
 *   @Post('example')
 *   example() {}
 * }
 * ```
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve the list of required roles from metadata
    const requiredRoles: Role[] = this.reflector.get<Role[]>(
      ROLES_METADATA_KEY,
      context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      // No roles required, allow access
      return true;
    }

    // Retrieve user information from the request
    const request = getRequest<{ user?: UserPayload }>(context);
    const user = request.user;

    if (!user?.roles) {
      throw new ForbiddenException(CUSTOM_HTTP_STATUS.FORBIDDEN);
    }

    // Check if the user has at least one of the required roles
    const hasRole: boolean = requiredRoles.some((requiredRole: Role): boolean =>
      user.roles.includes(requiredRole),
    );
    if (!hasRole) {
      throw new ForbiddenException(CUSTOM_HTTP_STATUS.FORBIDDEN);
    }

    // Valid role found, allow access
    return true;
  }
}
