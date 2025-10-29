import { readFileSync } from 'fs';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const logger = new Logger('DatabaseExtensions');
const prisma = new PrismaClient();

/**
 * Apply database extensions (indexes, constraints, etc.) from schema_extensions.sql
 * Should be run after db push/reset in development
 */
export async function applyDatabaseExtensions() {
  const sqlFile = readFileSync(join(__dirname, 'schema_extensions.sql'), 'utf-8');

  // Remove comment lines (-- comment) and empty lines, then split by semicolon
  const cleanSql = sqlFile
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('--'))
    .join('\n');

  // Split by semicolon and filter empty statements
  const statements = cleanSql
    .split(';')
    .map(stmt => stmt.trim().replace(/\s+/g, ' '))
    .filter(stmt => stmt.length > 0);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);

    if (statement.trim().toUpperCase().startsWith('DROP')) {
      logger.log(`Dropped: ${statement.substring(0, 50)}...`);
    } else {
      logger.log(`Applied: ${statement.substring(0, 50)}...`);
    }
  }

  logger.log('All database extensions applied successfully');
}

// If run directly (not imported), execute
if (require.main === module) {
  applyDatabaseExtensions()
    .catch(error => {
      logger.error('Failed to apply database extensions', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
