import 'reflect-metadata';

export const PASSTHROUGH_FIELDS_METADATA_KEY = Symbol('passthroughFields');

/**
 * @note ONLY PROCESSES THE FIRST LEVEL; NESTED PASSTHROUGH FIELDS ARE NOT HANDLED.
 * Fields marked with this decorator will be unwrapped when building Prisma select object from the model.
 *
 * @example
 * ```typescript
 * class PaginatedModel {
 *   @Passthrough()
 *   @Field(() => [Model])
 *   items: Model[]; // passthrough field, will be unwrapped
 * }
 * ```
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
