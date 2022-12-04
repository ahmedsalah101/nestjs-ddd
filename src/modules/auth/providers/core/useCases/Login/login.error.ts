import { DomainError } from '@common/core';

export namespace LoginError {
  export class InvalidCredentialsError implements DomainError {
    errMessage: string;
    constructor(errMessage: string) {
      this.errMessage = errMessage || `Invalid Credentials`;
    }
  }
}
