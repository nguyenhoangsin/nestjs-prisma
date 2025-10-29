import { STATUS_CODES } from 'http';
import { HttpStatus } from '@nestjs/common';
import { CustomHttpStatus } from 'src/common/types/common.type';

export const HTTP_STATUS_STANDARD_CODES: Record<string, CustomHttpStatus> = {
  CONTINUE: {
    statusKey: 'CONTINUE',
    message: STATUS_CODES[HttpStatus.CONTINUE]!,
  },
  SWITCHING_PROTOCOLS: {
    statusKey: 'SWITCHING_PROTOCOLS',
    message: STATUS_CODES[HttpStatus.SWITCHING_PROTOCOLS]!,
  },
  PROCESSING: {
    statusKey: 'PROCESSING',
    message: STATUS_CODES[HttpStatus.PROCESSING]!,
  },
  EARLYHINTS: {
    statusKey: 'EARLYHINTS',
    message: STATUS_CODES[HttpStatus.EARLYHINTS]!,
  },
  OK: {
    statusKey: 'OK',
    message: STATUS_CODES[HttpStatus.OK]!,
  },
  CREATED: {
    statusKey: 'CREATED',
    message: STATUS_CODES[HttpStatus.CREATED]!,
  },
  ACCEPTED: {
    statusKey: 'ACCEPTED',
    message: STATUS_CODES[HttpStatus.ACCEPTED]!,
  },
  NON_AUTHORITATIVE_INFORMATION: {
    statusKey: 'NON_AUTHORITATIVE_INFORMATION',
    message: STATUS_CODES[HttpStatus.NON_AUTHORITATIVE_INFORMATION]!,
  },
  NO_CONTENT: {
    statusKey: 'NO_CONTENT',
    message: STATUS_CODES[HttpStatus.NO_CONTENT]!,
  },
  RESET_CONTENT: {
    statusKey: 'RESET_CONTENT',
    message: STATUS_CODES[HttpStatus.RESET_CONTENT]!,
  },
  PARTIAL_CONTENT: {
    statusKey: 'PARTIAL_CONTENT',
    message: STATUS_CODES[HttpStatus.PARTIAL_CONTENT]!,
  },
  MULTI_STATUS: {
    statusKey: 'MULTI_STATUS',
    message: STATUS_CODES[HttpStatus.MULTI_STATUS]!,
  },
  ALREADY_REPORTED: {
    statusKey: 'ALREADY_REPORTED',
    message: STATUS_CODES[HttpStatus.ALREADY_REPORTED]!,
  },
  CONTENT_DIFFERENT: {
    statusKey: 'CONTENT_DIFFERENT',
    message: STATUS_CODES[HttpStatus.CONTENT_DIFFERENT]!,
  },
  AMBIGUOUS: {
    statusKey: 'AMBIGUOUS',
    message: STATUS_CODES[HttpStatus.AMBIGUOUS]!,
  },
  MOVED_PERMANENTLY: {
    statusKey: 'MOVED_PERMANENTLY',
    message: STATUS_CODES[HttpStatus.MOVED_PERMANENTLY]!,
  },
  FOUND: {
    statusKey: 'FOUND',
    message: STATUS_CODES[HttpStatus.FOUND]!,
  },
  SEE_OTHER: {
    statusKey: 'SEE_OTHER',
    message: STATUS_CODES[HttpStatus.SEE_OTHER]!,
  },
  NOT_MODIFIED: {
    statusKey: 'NOT_MODIFIED',
    message: STATUS_CODES[HttpStatus.NOT_MODIFIED]!,
  },
  TEMPORARY_REDIRECT: {
    statusKey: 'TEMPORARY_REDIRECT',
    message: STATUS_CODES[HttpStatus.TEMPORARY_REDIRECT]!,
  },
  PERMANENT_REDIRECT: {
    statusKey: 'PERMANENT_REDIRECT',
    message: STATUS_CODES[HttpStatus.PERMANENT_REDIRECT]!,
  },
  BAD_REQUEST: {
    statusKey: 'BAD_REQUEST',
    message: STATUS_CODES[HttpStatus.BAD_REQUEST]!,
  },
  UNAUTHORIZED: {
    statusKey: 'UNAUTHORIZED',
    message: STATUS_CODES[HttpStatus.UNAUTHORIZED]!,
  },
  PAYMENT_REQUIRED: {
    statusKey: 'PAYMENT_REQUIRED',
    message: STATUS_CODES[HttpStatus.PAYMENT_REQUIRED]!,
  },
  FORBIDDEN: {
    statusKey: 'FORBIDDEN',
    message: STATUS_CODES[HttpStatus.FORBIDDEN]!,
  },
  NOT_FOUND: {
    statusKey: 'NOT_FOUND',
    message: STATUS_CODES[HttpStatus.NOT_FOUND]!,
  },
  METHOD_NOT_ALLOWED: {
    statusKey: 'METHOD_NOT_ALLOWED',
    message: STATUS_CODES[HttpStatus.METHOD_NOT_ALLOWED]!,
  },
  NOT_ACCEPTABLE: {
    statusKey: 'NOT_ACCEPTABLE',
    message: STATUS_CODES[HttpStatus.NOT_ACCEPTABLE]!,
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    statusKey: 'PROXY_AUTHENTICATION_REQUIRED',
    message: STATUS_CODES[HttpStatus.PROXY_AUTHENTICATION_REQUIRED]!,
  },
  REQUEST_TIMEOUT: {
    statusKey: 'REQUEST_TIMEOUT',
    message: STATUS_CODES[HttpStatus.REQUEST_TIMEOUT]!,
  },
  CONFLICT: {
    statusKey: 'CONFLICT',
    message: STATUS_CODES[HttpStatus.CONFLICT]!,
  },
  GONE: {
    statusKey: 'GONE',
    message: STATUS_CODES[HttpStatus.GONE]!,
  },
  LENGTH_REQUIRED: {
    statusKey: 'LENGTH_REQUIRED',
    message: STATUS_CODES[HttpStatus.LENGTH_REQUIRED]!,
  },
  PRECONDITION_FAILED: {
    statusKey: 'PRECONDITION_FAILED',
    message: STATUS_CODES[HttpStatus.PRECONDITION_FAILED]!,
  },
  PAYLOAD_TOO_LARGE: {
    statusKey: 'PAYLOAD_TOO_LARGE',
    message: STATUS_CODES[HttpStatus.PAYLOAD_TOO_LARGE]!,
  },
  URI_TOO_LONG: {
    statusKey: 'URI_TOO_LONG',
    message: STATUS_CODES[HttpStatus.URI_TOO_LONG]!,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    statusKey: 'UNSUPPORTED_MEDIA_TYPE',
    message: STATUS_CODES[HttpStatus.UNSUPPORTED_MEDIA_TYPE]!,
  },
  REQUESTED_RANGE_NOT_SATISFIABLE: {
    statusKey: 'REQUESTED_RANGE_NOT_SATISFIABLE',
    message: STATUS_CODES[HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]!,
  },
  EXPECTATION_FAILED: {
    statusKey: 'EXPECTATION_FAILED',
    message: STATUS_CODES[HttpStatus.EXPECTATION_FAILED]!,
  },
  I_AM_A_TEAPOT: {
    statusKey: 'I_AM_A_TEAPOT',
    message: STATUS_CODES[HttpStatus.I_AM_A_TEAPOT]!,
  },
  MISDIRECTED: {
    statusKey: 'MISDIRECTED',
    message: STATUS_CODES[HttpStatus.MISDIRECTED]!,
  },
  UNPROCESSABLE_ENTITY: {
    statusKey: 'UNPROCESSABLE_ENTITY',
    message: STATUS_CODES[HttpStatus.UNPROCESSABLE_ENTITY]!,
  },
  LOCKED: {
    statusKey: 'LOCKED',
    message: STATUS_CODES[HttpStatus.LOCKED]!,
  },
  FAILED_DEPENDENCY: {
    statusKey: 'FAILED_DEPENDENCY',
    message: STATUS_CODES[HttpStatus.FAILED_DEPENDENCY]!,
  },
  PRECONDITION_REQUIRED: {
    statusKey: 'PRECONDITION_REQUIRED',
    message: STATUS_CODES[HttpStatus.PRECONDITION_REQUIRED]!,
  },
  TOO_MANY_REQUESTS: {
    statusKey: 'TOO_MANY_REQUESTS',
    message: STATUS_CODES[HttpStatus.TOO_MANY_REQUESTS]!,
  },
  UNRECOVERABLE_ERROR: {
    statusKey: 'UNRECOVERABLE_ERROR',
    message: STATUS_CODES[HttpStatus.UNRECOVERABLE_ERROR]!,
  },
  INTERNAL_SERVER_ERROR: {
    statusKey: 'INTERNAL_SERVER_ERROR',
    message: STATUS_CODES[HttpStatus.INTERNAL_SERVER_ERROR]!,
  },
  NOT_IMPLEMENTED: {
    statusKey: 'NOT_IMPLEMENTED',
    message: STATUS_CODES[HttpStatus.NOT_IMPLEMENTED]!,
  },
  BAD_GATEWAY: {
    statusKey: 'BAD_GATEWAY',
    message: STATUS_CODES[HttpStatus.BAD_GATEWAY]!,
  },
  SERVICE_UNAVAILABLE: {
    statusKey: 'SERVICE_UNAVAILABLE',
    message: STATUS_CODES[HttpStatus.SERVICE_UNAVAILABLE]!,
  },
  GATEWAY_TIMEOUT: {
    statusKey: 'GATEWAY_TIMEOUT',
    message: STATUS_CODES[HttpStatus.GATEWAY_TIMEOUT]!,
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    statusKey: 'HTTP_VERSION_NOT_SUPPORTED',
    message: STATUS_CODES[HttpStatus.HTTP_VERSION_NOT_SUPPORTED]!,
  },
  INSUFFICIENT_STORAGE: {
    statusKey: 'INSUFFICIENT_STORAGE',
    message: STATUS_CODES[HttpStatus.INSUFFICIENT_STORAGE]!,
  },
  LOOP_DETECTED: {
    statusKey: 'LOOP_DETECTED',
    message: STATUS_CODES[HttpStatus.LOOP_DETECTED]!,
  },
};
