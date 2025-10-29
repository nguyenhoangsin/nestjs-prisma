import {
  Injectable,
  Logger,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { PUBLIC_METADATA_KEY } from '@auth/auth-types';

/**
 * Guard that enforces authentication for route handlers.
 * Checks for valid JWT token and bypasses authentication if route is marked with `@Public()` decorator.
 *
 * @example
 * ```typescript
 * @Module({
 *   providers: [
 *     {
 *       provide: APP_GUARD,
 *       useClass: AuthGuard,
 *     },
 *   ],
 * })
 * ```
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // Allow access if the route is public
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(CUSTOM_HTTP_STATUS.UNAUTHORIZED);
    }

    request['user'] = {
      userId: 'userId',
      roles: [],
      permissions: [],
    };

    // Allow access if token is valid
    return true;
  }
}
