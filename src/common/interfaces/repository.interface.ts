/**
 * Base repository interface providing naming convention template for all repositories.
 */
export interface IRepository {
  /**
   * Find a single record by ID.
   * @param id - Record identifier
   * @param options - Optional query options (select, where, etc.)
   */
  findOne(id: string, options?: unknown): unknown;

  /**
   * Find all records without pagination.
   * @param options - Optional query options (select, where, orderBy, etc.)
   */
  findAll(options?: unknown): unknown;

  /**
   * Find records with pagination.
   * @param page - Page number (starts from 1)
   * @param limit - Number of records per page
   * @param options - Optional query options (select, where, orderBy, etc.)
   */
  findPaginated(page: number, limit: number, options?: unknown): unknown;

  /**
   * Create a new record.
   * @param dto - Input data
   */
  create(dto: unknown): unknown;

  /**
   * Create multiple records.
   * @param dtos - Array of input data
   */
  createMany(dtos: unknown[]): unknown;

  /**
   * Update an existing record.
   * @param id - Record identifier
   * @param dto - Input data
   */
  update(id: string, dto: unknown): unknown;

  /**
   * Update multiple records.
   * @param updates - Array of updates, each containing id and dto
   */
  updateMany(updates: Array<{ id: string; dto: unknown }>): unknown;

  /**
   * Create or update a record.
   * @param where - Condition to find existing record
   * @param dto - Input data for create or update
   */
  upsert(where: unknown, dto: unknown): unknown;

  /**
   * Delete a record.
   * @param id - Record identifier
   */
  delete(id: string): unknown;

  /**
   * Delete multiple records.
   * @param ids - Array of record identifiers
   */
  deleteMany(ids: string[]): unknown;

  /**
   * Restore a soft-deleted record.
   * @param id - Record identifier
   */
  restore(id: string): unknown;

  /**
   * Count records.
   * @param options - Optional query options (where, etc.)
   * @returns Number of records
   */
  count(options?: unknown): unknown;

  /**
   * Check if a record exists.
   * @param id - Record identifier
   * @param options - Optional query options (where, etc.)
   * @returns Boolean
   */
  exists(id: string, options?: unknown): unknown;
}
