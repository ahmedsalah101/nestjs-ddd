import { DomainError, ErrorPayload } from '@common/core';

export namespace RegisterError {
  export class CredentialsTakenError implements DomainError {
    errorPayload: ErrorPayload;
    constructor(errpayload: ErrorPayload) {
      this.errorPayload = {
        errMessage: errpayload.errMessage || 'Internal App Error',
      };
    }
  }

  export class InvalidEmailError implements DomainError {
    errorPayload: ErrorPayload;
    constructor(errpayload: ErrorPayload) {
      this.errorPayload = {
        errMessage: errpayload.errMessage || 'Internal App Error',
      };
    }
  }

  export class InvalidPasswordError implements DomainError {
    errorPayload: ErrorPayload;
    constructor(errpayload: ErrorPayload) {
      this.errorPayload = {
        errMessage: errpayload.errMessage || 'Internal App Error',
      };
    }
  }
}
