import { SetMetadata } from '@nestjs/common';
import { PUBLIC_METADATA_KEY } from '@auth/auth-types';

/**
 * Custom decorator to mark a route as public (no authentication required).
 * Assigns metadata that allows the authentication guard to bypass authentication for this route.
 *
 * @example
 * ```typescript
 * @Public()
 * @Get('example')
 * example() {}
 * ```
 */
export const Public = () => SetMetadata(PUBLIC_METADATA_KEY, true);
