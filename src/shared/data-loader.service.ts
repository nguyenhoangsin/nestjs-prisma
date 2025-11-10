import { Injectable, Scope } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { isNil, groupBy } from 'lodash';
import { PrismaSelectObject } from '@common/types/common.type';

export interface DataLoaderKey<K> {
  key: K;
  prismaSelect: PrismaSelectObject;
}

// Prisma model delegate interface for findMany operation
export interface PrismaModelDelegate<T = unknown> {
  findMany: (args: {
    where: Record<string, { in: (string | number)[] } | Record<string, unknown>>;
    select: Record<string, true | PrismaSelectObject>;
  }) => Promise<T[]>;
}

export interface DataLoaderOptions<T> {
  // Prisma model delegate (e.g., prisma.client.model)
  delegate: PrismaModelDelegate<unknown>;
  // Foreign key field name (e.g., "parentId")
  foreignKey: string;
  // Model class for transformation (e.g., Model)
  modelClass: new () => T;
  // Optional custom cache key function, defaults to key value
  cacheKeyFn?: <K extends string | number>(key: DataLoaderKey<K>) => string | number;
}

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  constructor() {}

  /**
   * Creates a DataLoader instance with batch loading logic
   * @param options Configuration options for the DataLoader
   * @returns DataLoader instance
   */
  createLoader<K extends string | number, T>(
    options: DataLoaderOptions<T>,
  ): DataLoader<DataLoaderKey<K>, T[], string | number> {
    const { delegate, foreignKey, modelClass, cacheKeyFn } = options;

    return new DataLoader<DataLoaderKey<K>, T[], string | number>(
      async (keys: DataLoaderKey<K>[]) => {
        if (keys.length === 0) return [];

        // Collect all unique keys, filtering out undefined and null values
        const uniqueKeys = [...new Set(keys.map(k => k.key).filter(k => !isNil(k)))];

        // If all keys were filtered out, return empty arrays for all keys
        if (uniqueKeys.length === 0) {
          return keys.map(() => []);
        }

        // Merge all select fields from all keys
        const mergedSelect: Record<string, true> = { [foreignKey]: true };
        keys.forEach(key => {
          if (key.prismaSelect?.select) {
            Object.keys(key.prismaSelect.select).forEach(field => {
              mergedSelect[field] = true;
            });
          }
        });

        // Query all records for all keys in a single query
        const results = await delegate.findMany({
          where: {
            [foreignKey]: { in: uniqueKeys },
          },
          select: mergedSelect,
        });

        // Group by foreign key: returns Record<string, T[]> where key is the foreign key value
        const grouped = groupBy(results, foreignKey);

        // Map results back to the original keys order and transform to model
        return keys.map(key => {
          const groupedResults = grouped[key.key as string] ?? [];
          return plainToInstance(modelClass, groupedResults);
        });
      },
      {
        // Cache by key only (or custom function) since we merge all select fields in batch function
        cacheKeyFn: cacheKeyFn || ((key: DataLoaderKey<K>) => key.key),
      },
    );
  }
}
