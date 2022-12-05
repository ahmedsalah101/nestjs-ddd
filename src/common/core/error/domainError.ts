export interface ErrorPayload {
  zodErrMessage?: string;
  errMessage?: string;
  err?: any;
}

export abstract class DomainError {
  abstract errorPayload: ErrorPayload;
}
