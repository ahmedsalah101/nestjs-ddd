import { DomainError, ErrorPayload } from '@common/core';

export class InvalidCredError implements DomainError {
  errorPayload: ErrorPayload;
  constructor(errpayload: ErrorPayload) {
    this.errorPayload = {
      errMessage: errpayload.errMessage || 'Internal App Error',
    };
  }
}

export class InvalidHashedPasswordError implements DomainError {
  errorPayload: ErrorPayload;
  constructor(errpayload: ErrorPayload) {
    this.errorPayload = {
      errMessage: errpayload.errMessage || 'Internal App Error',
    };
  }
}

export class NotMatchedError implements DomainError {
  errorPayload: ErrorPayload;
  constructor(errpayload: ErrorPayload) {
    this.errorPayload = {
      errMessage: errpayload.errMessage || 'Internal App Error',
    };
  }
}
