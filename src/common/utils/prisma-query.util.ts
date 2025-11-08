import { PrismaSelectObject } from '@common/types/common.type';
import { getVirtualFields } from '@common/decorators/virtual.decorator';

/**
 * Builds a PrismaSelectObject object from a model class.
 * Extracts field names from the class instance and excludes virtual fields.
 *
 * @example
 * ```typescript
 * class ModelClass {
 *   field1: string = '';
 *   @Virtual()
 *   virtualField: string = '';
 * }
 * const select = toPrismaSelect(ModelClass);
 * // Result: { select: { field1: true } }
 * ```
 */
export function toPrismaSelect(modelClass: new () => unknown): PrismaSelectObject {
  const instance = new modelClass() as Record<string, unknown>;
  const virtualFields = getVirtualFields(modelClass);
  const filteredFields = Object.keys(instance).filter(
    key =>
      key !== 'constructor' && typeof instance[key] !== 'function' && !virtualFields.includes(key),
  );

  const select: Record<string, true> = {};
  filteredFields.forEach(field => {
    select[field] = true;
  });

  return { select };
}
