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
   * @param options - Optional query options (select, etc.)
   */
  create(dto: unknown, options?: unknown): unknown;

  /**
   * Update an existing record.
   * @param id - Record identifier
   * @param dto - Input data
   * @param options - Optional query options (select, etc.)
   */
  update(id: string, dto: unknown, options?: unknown): unknown;

  /**
   * Remove a record (soft delete).
   * @param id - Record identifier
   * @param options - Optional query options (select, etc.)
   */
  remove(id: string, options?: unknown): unknown;

  /**
   * Remove multiple records (soft delete).
   * @param ids - Array of record identifiers
   */
  removeMany(ids: string[]): unknown;
}
