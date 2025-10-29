import { Logger } from '@nestjs/common';

/**
 * Registers global listeners for uncaught exceptions and unhandled promise rejections.
 * Call this once during application bootstrap.
 */
export function registerGlobalErrorHandlers() {
  const logger = new Logger('GlobalErrorHandler');

  // Listens for 'uncaughtException' events.
  process.on('uncaughtException', error => {
    logger.error('Uncaught Exception:', error);
  });

  // Listens for 'unhandledRejection' events.
  process.on('unhandledRejection', error => {
    logger.error('Unhandled Rejection:', error);
  });

  new Logger('Bootstrap').log('Global error handlers registered');
}
