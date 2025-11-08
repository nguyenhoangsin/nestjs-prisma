import 'reflect-metadata';

export const VIRTUAL_FIELDS_METADATA_KEY = Symbol('virtualFields');

/**
 * Decorator to mark a field as virtual (not mapped to database).
 * Fields marked with this decorator will be excluded when building Prisma select object from the model.
 * @example
 * ```typescript
 * class ModelClass {
 *   id: string = '';
 *   @Virtual()
 *   exampleField: string = ''; // not in database
 * }
 * ```
 */
export function Virtual() {
  return function (target: object, propertyKey: string) {
    if (!('constructor' in target) || typeof target.constructor !== 'function') {
      return;
    }

    const constructor = target.constructor as new () => unknown;
    const existingFields: string[] =
      (Reflect.getMetadata(VIRTUAL_FIELDS_METADATA_KEY, constructor) as Nullable<string[]>) ?? [];

    if (!existingFields.includes(propertyKey)) {
      existingFields.push(propertyKey);
      Reflect.defineMetadata(VIRTUAL_FIELDS_METADATA_KEY, existingFields, constructor);
    }
  };
}

/**
 * Gets all virtual fields from a class.
 * @param modelClass - The model class constructor
 * @returns Example: ['field1', 'field2']
 */
export function getVirtualFields(modelClass: new () => unknown): string[] {
  return (Reflect.getMetadata(VIRTUAL_FIELDS_METADATA_KEY, modelClass) as Nullable<string[]>) ?? [];
}
