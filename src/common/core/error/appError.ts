import { DomainError, ErrorPayload } from './domainError';

export namespace AppError {
  export class InvalidEntityIDError implements DomainError {
    errorPayload: ErrorPayload;
    constructor(errpayload: ErrorPayload) {
      this.errorPayload = { errMessage: errpayload.errMessage || 'Invalid Id' };
    }
  }

  export class InteralError implements DomainError {
    errorPayload: ErrorPayload;
    constructor(errpayload: ErrorPayload) {
      this.errorPayload = {
        errMessage: errpayload.errMessage || 'Internal App Error',
      };
    }
  }
}
