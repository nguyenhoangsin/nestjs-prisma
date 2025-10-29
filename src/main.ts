import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { registerGlobalErrorHandlers } from '@bootstrap/register-global-error-handlers';
import { registerMorgan } from '@bootstrap/register-morgan';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  registerGlobalErrorHandlers();

  const app = await NestFactory.create(AppModule);

  registerMorgan(app);
  app.enableCors({ origin: ['*'] });

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 NODE_ENV: ${process.env.NODE_ENV} | PORT: ${process.env.PORT ?? 3000}`);
}
void bootstrap();
