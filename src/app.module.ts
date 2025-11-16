import { Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig, graphqlScalars } from '@graphql/graphql.config';
import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';
import { HybridValidationPipe } from '@common/pipes/hybrid-validation.pipe';
import { DatabaseModule } from '@database/database.module';
import { AuthGuard } from '@auth/auth.guard';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot(graphqlConfig),
    DatabaseModule,
    SharedModule,
    UserModule,
  ],
  providers: [
    ...graphqlScalars,
    // APP_GUARD applies AuthGuard globally to enforce authentication.
    // Checks for valid JWT token, bypasses if route is marked with @Public().
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // APP_PIPE applies ValidationPipe globally to validate request payloads.
    // Uses class-validator decorators (e.g., @IsString(), @IsEmail()).
    {
      provide: APP_PIPE,
      useValue: new HybridValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
    // APP_FILTER applies GlobalExceptionFilter globally to handle exceptions.
    // Converts HttpException to CustomHttpStatus for consistent response format.
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
