import { SetMetadata } from '@nestjs/common';
import { ROLES_METADATA_KEY, Role } from '@auth/auth-types';

/**
 * Custom decorator to define required roles for a route handler.
 * Assigns metadata that can be accessed by `RolesGuard` to enforce role-based access control.
 *
 * @example
 * ```typescript
 * @Roles(Role.ROLE_1, Role.ROLE_2)
 * @Post('example')
 * example() {}
 * ```
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_METADATA_KEY, roles);
