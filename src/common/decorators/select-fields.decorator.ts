import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelect } from '@paljs/plugins';
import { PrismaSelectObject } from '@common/types/common.type';
import { getVirtualFields } from '@common/decorators/virtual.decorator';
import { getPassthroughFields } from '@common/decorators/passthrough.decorator';

/**
 * Extracts Prisma select object from GraphQL resolve info.
 * When modelClass is provided, automatically unwraps passthrough fields and excludes virtual fields.
 * For nested relationships, use @ResolveField() with @Parent() and @Info() decorators.
 *
 * @param modelClass - Optional model class to process. If provided, unwraps passthrough fields and filters virtual fields.
 *
 * @example
 * ```typescript
 * @Query(() => Model)
 * getModel(
 *   @Args('identifier', { type: () => ID }) identifier: string,
 *   @SelectFields(ModelClass) select: PrismaSelectObject,
 * ): Promise<Model> {}
 *
 * @ResolveField(() => [RelatedModel])
 * async relatedModels(
 *   @Parent() parent: Model,
 *   @SelectFields(RelatedModelClass) select: PrismaSelectObject,
 * ): Promise<RelatedModel[]> {}
 * ```
 */
export function SelectFields(modelClass?: new () => unknown) {
  return createParamDecorator((data: unknown, ctx: ExecutionContext): PrismaSelectObject => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const info = gqlContext.getInfo<GraphQLResolveInfo>();

    if (!info) {
      return { select: {} };
    }

    const selectField = new PrismaSelect(info).value as PrismaSelectObject;

    if (modelClass) {
      return filterVirtualFields(unwrapPassthroughFields(selectField, modelClass), modelClass);
    }

    return selectField;
  })();
}

/**
 * @note ONLY PROCESSES THE FIRST LEVEL; NESTED PASSTHROUGH FIELDS ARE NOT HANDLED.
 * Unwraps passthrough fields from a Prisma select object at the root level only.
 * When a passthrough field is found, returns the children's select object directly.
 */
export function unwrapPassthroughFields(
  selectField: PrismaSelectObject,
  passthroughClass: new () => unknown,
): PrismaSelectObject {
  if (!selectField.select || Object.keys(selectField.select).length === 0) {
    return selectField;
  }

  const passthroughFields = getPassthroughFields(passthroughClass);

  for (const [fieldName, value] of Object.entries(selectField.select)) {
    if (passthroughFields.includes(fieldName)) {
      // If the value is a PrismaSelectObject, unwrap it and return the children's select
      if (
        value !== null &&
        typeof value === 'object' &&
        'select' in value &&
        typeof value.select === 'object' &&
        value.select !== null
      ) {
        return value;
      }
    }
  }

  return selectField;
}

/**
 * Filters virtual fields from a Prisma select object for the root model only.
 * Excludes nested relationship fields (handled by @ResolveField()).
 */
export function filterVirtualFields(
  selectField: PrismaSelectObject,
  modelClass: new () => unknown,
): PrismaSelectObject {
  if (!selectField.select || Object.keys(selectField.select).length === 0) {
    return selectField;
  }

  const filteredSelect: Record<string, true | PrismaSelectObject> = {};
  const virtualFields = getVirtualFields(modelClass);

  for (const [fieldName, value] of Object.entries(selectField.select)) {
    // Skip virtual fields
    if (virtualFields.includes(fieldName)) {
      continue;
    }

    // A nested PrismaSelectObject is an object with a 'select' property that is also an object
    if (
      value !== null &&
      typeof value === 'object' &&
      'select' in value &&
      typeof value.select === 'object' &&
      value.select !== null
    ) {
      // Skip nested relationship - it should be handled by @ResolveField()
      continue;
    }

    // Include all other fields
    filteredSelect[fieldName] = value;
  }

  return { select: filteredSelect };
}
