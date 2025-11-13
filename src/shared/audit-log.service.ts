import { Injectable } from '@nestjs/common';
import { EntityType, AuditEventType, Prisma } from '@prisma/client';
import { PrismaService } from '@database/prisma/prisma.service';

export interface AuditChanges {
  before?: Record<string, any>;
  after?: Record<string, any>;
  changedFields?: string[];
}

export interface AuditLogCreateInput {
  entityType: EntityType;
  entityId: string;
  eventType: AuditEventType;
  userId?: string;
  changes?: AuditChanges;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Log a CREATE event
   * @param entityType - Type of entity being created
   * @param entityId - ID of the created entity
   * @param userId - Optional ID of user performing the action
   * @param after - The created entity data
   * @param metadata - Optional additional metadata
   */
  async logCreate(
    entityType: EntityType,
    entityId: string,
    userId?: string,
    after?: Record<string, any>,
    metadata?: Record<string, any>,
  ) {
    const changes: AuditChanges = {
      after,
      changedFields: after ? Object.keys(after) : [],
    };

    return this.createLog({
      entityType,
      entityId,
      eventType: AuditEventType.CREATE,
      userId,
      changes,
      metadata,
    });
  }

  /**
   * Log an UPDATE event
   * @param entityType - Type of entity being updated
   * @param entityId - ID of the updated entity
   * @param userId - Optional ID of user performing the action
   * @param before - The entity data before update
   * @param after - The entity data after update
   * @param metadata - Optional additional metadata
   */
  async logUpdate(
    entityType: EntityType,
    entityId: string,
    userId?: string,
    before?: Record<string, any>,
    after?: Record<string, any>,
    metadata?: Record<string, any>,
  ) {
    const changedFields = this.getChangedFields(before, after);

    const changes: AuditChanges = {
      before,
      after,
      changedFields,
    };

    return this.createLog({
      entityType,
      entityId,
      eventType: AuditEventType.UPDATE,
      userId,
      changes,
      metadata,
    });
  }

  /**
   * Log a DELETE event
   * @param entityType - Type of entity being deleted
   * @param entityId - ID of the deleted entity
   * @param userId - Optional ID of user performing the action
   * @param before - The entity data before deletion
   * @param metadata - Optional additional metadata
   */
  async logDelete(
    entityType: EntityType,
    entityId: string,
    userId?: string,
    before?: Record<string, any>,
    metadata?: Record<string, any>,
  ) {
    const changes: AuditChanges = {
      before,
      changedFields: before ? Object.keys(before) : [],
    };

    return this.createLog({
      entityType,
      entityId,
      eventType: AuditEventType.DELETE,
      userId,
      changes,
      metadata,
    });
  }

  /**
   * Create an audit log entry
   * @param input - Audit log data
   */
  private async createLog(input: AuditLogCreateInput) {
    const data: Prisma.AuditLogCreateInput = {
      entityType: input.entityType,
      entityId: input.entityId,
      eventType: input.eventType,
      changes: input.changes as Prisma.InputJsonValue,
      metadata: input.metadata as Prisma.InputJsonValue,
      ...(input.userId && { userId: input.userId }),
    };

    return this.prisma.auditLog.create({
      data,
    });
  }

  /**
   * Get list of changed fields between before and after objects
   * @param before - Object before changes
   * @param after - Object after changes
   * @returns Array of field names that changed
   */
  private getChangedFields(before?: Record<string, any>, after?: Record<string, any>): string[] {
    if (!before || !after) {
      return [];
    }

    const changedFields: string[] = [];
    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);

    for (const key of allKeys) {
      const beforeValue = before[key] as unknown;
      const afterValue = after[key] as unknown;

      // Compare values (handles nested objects and arrays)
      if (JSON.stringify(beforeValue) !== JSON.stringify(afterValue)) {
        changedFields.push(key);
      }
    }

    return changedFields;
  }
}
