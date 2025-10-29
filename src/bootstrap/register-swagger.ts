import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from '@common/enums/common.enum';

export function registerSwagger(app: INestApplication) {
  if (process.env.NODE_ENV === Environment.production) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token only ("Bearer" prefix will be added automatically)',
      },
      //'JWT-auth', // Security scheme name for matching up with @ApiBearerAuth('JWT-auth') in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'API Docs',
    swaggerOptions: {
      persistAuthorization: true, // Keep token after page refresh
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  new Logger('Bootstrap').log('Swagger documentation registered at /docs');
}
