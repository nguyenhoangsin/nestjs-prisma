import { HttpException } from '@nestjs/common';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { CustomHttpStatus } from '@common/types/common.type';
import type { GraphQLFormattedError, GraphQLError } from 'graphql';

// GraphQL error codes mapping
const GRAPHQL_CODE_TO_STATUS: Record<string, number> = {
  BAD_USER_INPUT: 400,
  GRAPHQL_VALIDATION_FAILED: 400,
  INTERNAL_SERVER_ERROR: 500,
};

export function graphqlFormatError(
  formattedError: GraphQLFormattedError,
  error: GraphQLError & {
    originalError?: HttpException | Error;
  },
): CustomHttpStatus {
  const code =
    (formattedError.extensions?.code as string | undefined) ??
    CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.code;

  const statusCode: number =
    (formattedError.extensions?.statusCode as number | undefined) ??
    (error.originalError instanceof HttpException ? error.originalError.getStatus() : undefined) ??
    GRAPHQL_CODE_TO_STATUS[code] ??
    500;

  const message = formattedError.message ?? CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.message;
  // Validation message from class-validator
  const validationMessage = (
    formattedError.extensions?.originalError as { message: string[] }
  )?.message?.join('; ');

  return {
    statusCode,
    code: validationMessage ? CUSTOM_HTTP_STATUS.VALIDATION_FAILED.code : code,
    message: validationMessage ?? message,
  };
}
