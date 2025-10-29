import { STATUS_CODES } from 'http';
import { HttpStatus } from '@nestjs/common';
import { CustomHttpStatus } from 'src/common/types/common.type';

export const CUSTOM_HTTP_STATUS: Record<string, CustomHttpStatus> = {
  // Standard HTTP Status Codes
  CONTINUE: {
    statusCode: 100,
    code: 'CONTINUE',
    message: STATUS_CODES[HttpStatus.CONTINUE]!,
  },
  SWITCHING_PROTOCOLS: {
    statusCode: 101,
    code: 'SWITCHING_PROTOCOLS',
    message: STATUS_CODES[HttpStatus.SWITCHING_PROTOCOLS]!,
  },
  PROCESSING: {
    statusCode: 102,
    code: 'PROCESSING',
    message: STATUS_CODES[HttpStatus.PROCESSING]!,
  },
  EARLYHINTS: {
    statusCode: 103,
    code: 'EARLYHINTS',
    message: STATUS_CODES[HttpStatus.EARLYHINTS]!,
  },
  OK: {
    statusCode: 200,
    code: 'OK',
    message: STATUS_CODES[HttpStatus.OK]!,
  },
  CREATED: {
    statusCode: 201,
    code: 'CREATED',
    message: STATUS_CODES[HttpStatus.CREATED]!,
  },
  ACCEPTED: {
    statusCode: 202,
    code: 'ACCEPTED',
    message: STATUS_CODES[HttpStatus.ACCEPTED]!,
  },
  NON_AUTHORITATIVE_INFORMATION: {
    statusCode: 203,
    code: 'NON_AUTHORITATIVE_INFORMATION',
    message: STATUS_CODES[HttpStatus.NON_AUTHORITATIVE_INFORMATION]!,
  },
  NO_CONTENT: {
    statusCode: 204,
    code: 'NO_CONTENT',
    message: STATUS_CODES[HttpStatus.NO_CONTENT]!,
  },
  RESET_CONTENT: {
    statusCode: 205,
    code: 'RESET_CONTENT',
    message: STATUS_CODES[HttpStatus.RESET_CONTENT]!,
  },
  PARTIAL_CONTENT: {
    statusCode: 206,
    code: 'PARTIAL_CONTENT',
    message: STATUS_CODES[HttpStatus.PARTIAL_CONTENT]!,
  },
  MULTI_STATUS: {
    statusCode: 207,
    code: 'MULTI_STATUS',
    message: STATUS_CODES[HttpStatus.MULTI_STATUS]!,
  },
  ALREADY_REPORTED: {
    statusCode: 208,
    code: 'ALREADY_REPORTED',
    message: STATUS_CODES[HttpStatus.ALREADY_REPORTED]!,
  },
  CONTENT_DIFFERENT: {
    statusCode: 210,
    code: 'CONTENT_DIFFERENT',
    message: STATUS_CODES[HttpStatus.CONTENT_DIFFERENT]!,
  },
  AMBIGUOUS: {
    statusCode: 300,
    code: 'AMBIGUOUS',
    message: STATUS_CODES[HttpStatus.AMBIGUOUS]!,
  },
  MOVED_PERMANENTLY: {
    statusCode: 301,
    code: 'MOVED_PERMANENTLY',
    message: STATUS_CODES[HttpStatus.MOVED_PERMANENTLY]!,
  },
  FOUND: {
    statusCode: 302,
    code: 'FOUND',
    message: STATUS_CODES[HttpStatus.FOUND]!,
  },
  SEE_OTHER: {
    statusCode: 303,
    code: 'SEE_OTHER',
    message: STATUS_CODES[HttpStatus.SEE_OTHER]!,
  },
  NOT_MODIFIED: {
    statusCode: 304,
    code: 'NOT_MODIFIED',
    message: STATUS_CODES[HttpStatus.NOT_MODIFIED]!,
  },
  TEMPORARY_REDIRECT: {
    statusCode: 307,
    code: 'TEMPORARY_REDIRECT',
    message: STATUS_CODES[HttpStatus.TEMPORARY_REDIRECT]!,
  },
  PERMANENT_REDIRECT: {
    statusCode: 308,
    code: 'PERMANENT_REDIRECT',
    message: STATUS_CODES[HttpStatus.PERMANENT_REDIRECT]!,
  },
  BAD_REQUEST: {
    statusCode: 400,
    code: 'BAD_REQUEST',
    message: STATUS_CODES[HttpStatus.BAD_REQUEST]!,
  },
  UNAUTHORIZED: {
    statusCode: 401,
    code: 'UNAUTHORIZED',
    message: STATUS_CODES[HttpStatus.UNAUTHORIZED]!,
  },
  PAYMENT_REQUIRED: {
    statusCode: 402,
    code: 'PAYMENT_REQUIRED',
    message: STATUS_CODES[HttpStatus.PAYMENT_REQUIRED]!,
  },
  FORBIDDEN: {
    statusCode: 403,
    code: 'FORBIDDEN',
    message: STATUS_CODES[HttpStatus.FORBIDDEN]!,
  },
  NOT_FOUND: {
    statusCode: 404,
    code: 'NOT_FOUND',
    message: STATUS_CODES[HttpStatus.NOT_FOUND]!,
  },
  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    code: 'METHOD_NOT_ALLOWED',
    message: STATUS_CODES[HttpStatus.METHOD_NOT_ALLOWED]!,
  },
  NOT_ACCEPTABLE: {
    statusCode: 406,
    code: 'NOT_ACCEPTABLE',
    message: STATUS_CODES[HttpStatus.NOT_ACCEPTABLE]!,
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    statusCode: 407,
    code: 'PROXY_AUTHENTICATION_REQUIRED',
    message: STATUS_CODES[HttpStatus.PROXY_AUTHENTICATION_REQUIRED]!,
  },
  REQUEST_TIMEOUT: {
    statusCode: 408,
    code: 'REQUEST_TIMEOUT',
    message: STATUS_CODES[HttpStatus.REQUEST_TIMEOUT]!,
  },
  CONFLICT: {
    statusCode: 409,
    code: 'CONFLICT',
    message: STATUS_CODES[HttpStatus.CONFLICT]!,
  },
  GONE: {
    statusCode: 410,
    code: 'GONE',
    message: STATUS_CODES[HttpStatus.GONE]!,
  },
  LENGTH_REQUIRED: {
    statusCode: 411,
    code: 'LENGTH_REQUIRED',
    message: STATUS_CODES[HttpStatus.LENGTH_REQUIRED]!,
  },
  PRECONDITION_FAILED: {
    statusCode: 412,
    code: 'PRECONDITION_FAILED',
    message: STATUS_CODES[HttpStatus.PRECONDITION_FAILED]!,
  },
  PAYLOAD_TOO_LARGE: {
    statusCode: 413,
    code: 'PAYLOAD_TOO_LARGE',
    message: STATUS_CODES[HttpStatus.PAYLOAD_TOO_LARGE]!,
  },
  URI_TOO_LONG: {
    statusCode: 414,
    code: 'URI_TOO_LONG',
    message: STATUS_CODES[HttpStatus.URI_TOO_LONG]!,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    statusCode: 415,
    code: 'UNSUPPORTED_MEDIA_TYPE',
    message: STATUS_CODES[HttpStatus.UNSUPPORTED_MEDIA_TYPE]!,
  },
  REQUESTED_RANGE_NOT_SATISFIABLE: {
    statusCode: 416,
    code: 'REQUESTED_RANGE_NOT_SATISFIABLE',
    message: STATUS_CODES[HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]!,
  },
  EXPECTATION_FAILED: {
    statusCode: 417,
    code: 'EXPECTATION_FAILED',
    message: STATUS_CODES[HttpStatus.EXPECTATION_FAILED]!,
  },
  I_AM_A_TEAPOT: {
    statusCode: 418,
    code: 'I_AM_A_TEAPOT',
    message: STATUS_CODES[HttpStatus.I_AM_A_TEAPOT]!,
  },
  MISDIRECTED: {
    statusCode: 421,
    code: 'MISDIRECTED',
    message: STATUS_CODES[HttpStatus.MISDIRECTED]!,
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    code: 'UNPROCESSABLE_ENTITY',
    message: STATUS_CODES[HttpStatus.UNPROCESSABLE_ENTITY]!,
  },
  LOCKED: {
    statusCode: 423,
    code: 'LOCKED',
    message: STATUS_CODES[HttpStatus.LOCKED]!,
  },
  FAILED_DEPENDENCY: {
    statusCode: 424,
    code: 'FAILED_DEPENDENCY',
    message: STATUS_CODES[HttpStatus.FAILED_DEPENDENCY]!,
  },
  PRECONDITION_REQUIRED: {
    statusCode: 428,
    code: 'PRECONDITION_REQUIRED',
    message: STATUS_CODES[HttpStatus.PRECONDITION_REQUIRED]!,
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    code: 'TOO_MANY_REQUESTS',
    message: STATUS_CODES[HttpStatus.TOO_MANY_REQUESTS]!,
  },
  UNRECOVERABLE_ERROR: {
    statusCode: 456,
    code: 'UNRECOVERABLE_ERROR',
    message: STATUS_CODES[HttpStatus.UNRECOVERABLE_ERROR]!,
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR]!,
  },
  NOT_IMPLEMENTED: {
    statusCode: 501,
    code: 'NOT_IMPLEMENTED',
    message: STATUS_CODES[HttpStatus.NOT_IMPLEMENTED]!,
  },
  BAD_GATEWAY: {
    statusCode: 502,
    code: 'BAD_GATEWAY',
    message: STATUS_CODES[HttpStatus.BAD_GATEWAY]!,
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    code: 'SERVICE_UNAVAILABLE',
    message: STATUS_CODES[HttpStatus.SERVICE_UNAVAILABLE]!,
  },
  GATEWAY_TIMEOUT: {
    statusCode: 504,
    code: 'GATEWAY_TIMEOUT',
    message: STATUS_CODES[HttpStatus.GATEWAY_TIMEOUT]!,
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    statusCode: 505,
    code: 'HTTP_VERSION_NOT_SUPPORTED',
    message: STATUS_CODES[HttpStatus.HTTP_VERSION_NOT_SUPPORTED]!,
  },
  INSUFFICIENT_STORAGE: {
    statusCode: 507,
    code: 'INSUFFICIENT_STORAGE',
    message: STATUS_CODES[HttpStatus.INSUFFICIENT_STORAGE]!,
  },
  LOOP_DETECTED: {
    statusCode: 508,
    code: 'LOOP_DETECTED',
    message: STATUS_CODES[HttpStatus.LOOP_DETECTED]!,
  },

  // Custom HTTP Status Codes
  VALIDATION_FAILED: {
    statusCode: 400,
    code: 'VALIDATION_FAILED',
    message: 'Validation failed',
  },
};
