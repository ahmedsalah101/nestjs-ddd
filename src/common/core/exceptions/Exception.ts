import { DomainError } from '../error';
import { Result } from '../Result';

export interface ExceptionPayload {
  code: number;
  error: Result<DomainError>;
}
export class Exception extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(exceptionPayload: ExceptionPayload) {
    super();
    this.code = exceptionPayload.code;
    this.message = exceptionPayload.error.getValue().message;
    Error.captureStackTrace(this, this.constructor);
  }
}
