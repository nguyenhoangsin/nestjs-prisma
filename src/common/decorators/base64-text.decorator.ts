import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isNil, isString } from 'lodash';
import { decodeBase64Text } from '@common/utils/base64.util';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';

/**
 * Property decorator that automatically decodes Base64 strings to text.
 * Only decodes when the result is safe printable text (not binary data like images).
 *
 * @example
 * ```typescript
 * class ExampleDto {
 *   @Base64Text()
 *   example: string;
 * }
 * ```
 */
export function Base64Text() {
  return Transform(({ value, key }: { value: Nullable<string>; key: string }): Nullable<string> => {
    // Allow undefined/null for optional fields
    if (isNil(value)) {
      return value;
    }

    if (!isString(value)) {
      throw new BadRequestException({
        ...CUSTOM_HTTP_STATUS.VALIDATION_FAILED,
        message: `${key} must be a string`,
      });
    }

    try {
      return decodeBase64Text(value);
    } catch (error) {
      throw new BadRequestException({
        ...CUSTOM_HTTP_STATUS.VALIDATION_FAILED,
        message: `${key} ${error instanceof Error ? error.message : 'decode base64 failed'}`,
      });
    }
  });
}
