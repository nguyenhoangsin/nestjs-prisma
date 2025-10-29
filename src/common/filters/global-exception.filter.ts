import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HTTP_STATUS_STANDARD_CODES } from '@common/constants/http-status.constant';
import { CustomHttpStatus } from '@common/types/common.type';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode: number =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseHttpStatus: CustomHttpStatus =
      exception instanceof HttpException
        ? { ...(exception.getResponse() as CustomHttpStatus), statusCode }
        : {
            statusCode,
            statusKey: HTTP_STATUS_STANDARD_CODES.INTERNAL_SERVER_ERROR.statusKey,
            message: HTTP_STATUS_STANDARD_CODES.INTERNAL_SERVER_ERROR.message,
          };

    response.status(statusCode).json(responseHttpStatus);
  }
}
