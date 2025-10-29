import { Logger, INestApplication } from '@nestjs/common';
import * as morgan from 'morgan';

// Logger for HTTP requests
const logger = new Logger('HTTP');

// Morgan-compatible stream object
const morganStream = {
  write(message: string) {
    logger.log(message.trim());
  },
};

// Use Morgan middleware for HTTP request logging
export function registerMorgan(app: INestApplication) {
  app.use((morgan as (...args: unknown[]) => unknown)('tiny', { stream: morganStream }));
  new Logger('Bootstrap').log('Morgan middleware registered');
}
