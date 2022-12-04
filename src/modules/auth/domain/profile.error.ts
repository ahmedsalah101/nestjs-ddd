import { DomainError, ErrorPayload } from '@common/core';

export class InvalidUserProfileError implements DomainError {
  errorPayload: ErrorPayload;
  constructor(errpayload: ErrorPayload) {
    this.errorPayload = {
      errMessage: errpayload.errMessage || 'Internal App Error',
    };
  }
}
