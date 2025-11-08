import { get, isArray } from 'lodash';
import { type GraphQLFormattedError } from 'graphql';
import { CUSTOM_HTTP_STATUS } from '@common/constants/http-status.constant';
import { CustomHttpStatus } from '@common/types/common.type';

export function graphqlFormatError(formattedError: GraphQLFormattedError): CustomHttpStatus {
  let code: string =
    (get(formattedError, 'extensions.originalError.code') as Nullable<string>) ??
    (get(formattedError, 'extensions.code') as Nullable<string>) ??
    CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.code;
  const statusCode: number =
    (get(formattedError, 'extensions.originalError.statusCode') as Nullable<number>) ??
    (get(formattedError, 'extensions.status') as Nullable<number>) ??
    500;
  let message =
    (get(formattedError, 'extensions.originalError.message') as Nullable<string>) ??
    formattedError.message ??
    CUSTOM_HTTP_STATUS.INTERNAL_SERVER_ERROR.message;

  // Validation message from class-validator
  const originalErrorMessage: Nullable<string | string[]> = get(
    formattedError,
    'extensions.originalError.message',
  ) as Nullable<string | string[]>;
  const validationMessage: Nullable<string> = isArray(originalErrorMessage)
    ? originalErrorMessage.join('; ')
    : null;
  if (validationMessage) {
    code = CUSTOM_HTTP_STATUS.VALIDATION_FAILED.code;
    message = validationMessage;
  }

  return { statusCode, code, message };
}
