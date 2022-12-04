import { DomainError } from '../error';

export interface ExceptionPayload {
  code: number;
  error: DomainError;
}
export class Exception extends Error {
  public readonly code: number;
  public readonly message: string;
  public readonly errorType: string;

  constructor(exceptionPayload: ExceptionPayload) {
    super();
    this.code = exceptionPayload.code;
    this.errorType = exceptionPayload.error.constructor.name;
    this.message = exceptionPayload.error.errorPayload.errMessage;
    Error.captureStackTrace(this, this.constructor);
  }
}
