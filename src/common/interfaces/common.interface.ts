import { PaginationMeta } from '@common/dtos/common.dto';

export interface IPaginated<T> {
  items: T[];
  meta: PaginationMeta;
}
