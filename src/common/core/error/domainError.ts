export interface ErrorPayload {
  errMessage?: string;
  err?: any;
}

export abstract class DomainError {
  abstract errorPayload: ErrorPayload;
}
