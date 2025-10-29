import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS_STANDARD_CODES } from '@common/constants/http-status.constant';
import { PERMISSIONS_METADATA_KEY, Permission, UserPayload } from '@auth/auth.types';

/**
 * Guard that enforces permission-based access control for route handlers.
 * Checks if authenticated user has required permissions from `@Permissions()` decorator.
 *
 * @example
 * ```typescript
 * @Controller('example')
 * export class ExampleController {
 *   @UseGuards(PermissionsGuard)
 *   @Permissions(Permission.PERMISSION_1, Permission.PERMISSION_2)
 *   @Post('example')
 *   example() {}
 * }
 * ```
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve the list of required permissions from metadata
    const requiredPermissions: Permission[] = this.reflector.get<Permission[]>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler(),
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      // No permissions required, allow access
      return true;
    }

    // Retrieve user information from the request
    const request = context.switchToHttp().getRequest<{ user?: UserPayload }>();
    const user = request.user;

    if (!user?.permissions) {
      throw new ForbiddenException(HTTP_STATUS_STANDARD_CODES.FORBIDDEN);
    }

    // Check if the user has at least one permission from the required list
    const hasPermission = requiredPermissions.some((requiredPermission: Permission): boolean =>
      user.permissions.includes(requiredPermission),
    );
    if (!hasPermission) {
      throw new ForbiddenException(HTTP_STATUS_STANDARD_CODES.FORBIDDEN);
    }

    // Valid permission found, allow access
    return true;
  }
}
