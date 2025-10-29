import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { CustomHttpStatus } from '@common/types/common.type';

/**
 * Global Exception Filter - Catches all exceptions and converts them to CustomHttpStatus format.
 * Only handles HTTP context (skips GraphQL), returns consistent error response structure.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    // Only handle HTTP context
    const contextType = host.getType();
    if (contextType !== 'http') {
      return;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseHttpStatus: CustomHttpStatus = this.getResponseHttpStatus(exception);
    response.status(responseHttpStatus.statusCode ?? 500).json(responseHttpStatus);
  }

  getResponseHttpStatus(exception: HttpException | Error): CustomHttpStatus {
    if (exception instanceof HttpException) {
      const response = exception.getResponse() as CustomHttpStatus;
      const statusCode = exception.getStatus();
      const code =
        response.code ??
        (statusCode === 400 && Array.isArray(response.message)
          ? CUSTOM_HTTP_STATUS.VALIDATION_FAILED.code
          : CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.code);

      const message = Array.isArray(response.message)
        ? // Validation message from class-validator
          response.message.join('; ')
        : response.message;
      return {
        statusCode,
        code,
        message,
      };
    }

    return {
      statusCode: 500,
      code: CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      message: CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
    };
  }
}
