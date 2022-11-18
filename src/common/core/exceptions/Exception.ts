export interface ExceptionPayload {
  code: number;
  message: string;
}
export class Exception extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(exceptionPayload: ExceptionPayload) {
    super();
    this.code = exceptionPayload.code;
    this.message = exceptionPayload.message;
    Error.captureStackTrace(this, this.constructor);
  }
}
