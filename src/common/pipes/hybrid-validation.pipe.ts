import { Injectable, ValidationPipe, ArgumentMetadata } from '@nestjs/common';

/**
 * ValidationPipe that supports both REST and GraphQL.
 * Relaxes validation rules for GraphQL (does not throw error for extra fields).
 */
@Injectable()
export class HybridValidationPipe extends ValidationPipe {
  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    const isRest = metadata.metatype?.name?.endsWith('Dto');

    if (isRest) {
      const restPipe = new ValidationPipe({
        ...this.validatorOptions,
        forbidNonWhitelisted: true,
      });
      return restPipe.transform(value, metadata);
    }

    return super.transform(value, metadata);
  }
}
