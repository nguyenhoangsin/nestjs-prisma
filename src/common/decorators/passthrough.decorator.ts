import 'reflect-metadata';

export const PASSTHROUGH_FIELDS_METADATA_KEY = Symbol('passthroughFields');

/**
 * Used for pagination to unwrap fields when building Prisma select queries.
 * When GraphQL requests fields from a paginated response (e.g., `items { id, email }`),
 * this decorator unwraps the `items` field and uses its nested select object directly for the model query,
 * instead of trying to select the `items` field from the database (which doesn't exist).
 *
 * @example
 * ```typescript
 * class PaginatedModel {
 *   @Passthrough()
 *   @Field(() => [Model])
 *   items: Model[]; // passthrough field, will be unwrapped
 * }
 * ```
 *
 * GraphQL query: `{ items { id, email }, meta { total } }`
 * Instead of: `{ select: { items: { select: { id: true, email: true } }, meta: { select: { total: true } } } }`
 * Unwraps to: `{ select: { id: true, email: true } }`
 * @note `meta` is excluded because `unwrapPassthroughFields` returns only the nested select of the passthrough field (`items`),
 *       other fields are not handled.
 */
export function Passthrough() {
  return function (target: object, propertyKey: string) {
    if (!('constructor' in target) || typeof target.constructor !== 'function') {
      return;
    }

    const constructor = target.constructor as new () => unknown;
    const existingFields: string[] =
      (Reflect.getMetadata(PASSTHROUGH_FIELDS_METADATA_KEY, constructor) as Nullable<string[]>) ??
      [];

    if (!existingFields.includes(propertyKey)) {
      existingFields.push(propertyKey);
      Reflect.defineMetadata(PASSTHROUGH_FIELDS_METADATA_KEY, existingFields, constructor);
    }
  };
}

/**
 * Gets all passthrough fields from a class.
 * @param modelClass - The model class constructor
 * @returns Example: ['items', 'data']
 */
export function getPassthroughFields(modelClass: new () => unknown): string[] {
  return (
    (Reflect.getMetadata(PASSTHROUGH_FIELDS_METADATA_KEY, modelClass) as Nullable<string[]>) ?? []
  );
}
