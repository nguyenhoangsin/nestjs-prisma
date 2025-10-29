import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_METADATA_KEY, Permission } from '@auth/auth-types';

/**
 * Custom decorator to define required permissions for a route handler.
 * Assigns metadata that can be accessed by `PermissionsGuard` to enforce permission-based access control.
 *
 * @example
 * ```typescript
 * @Permissions(Permission.PERMISSION_1, Permission.PERMISSION_2)
 * @Post('example')
 * example() {}
 * ```
 */
export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
