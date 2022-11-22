import { Result } from '../Result';
import { DomainError } from './domainError';

export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    private constructor(err: any, message?: string) {
      super(false, err, { message: message || 'An unexpected error occured' });
    }

    public static create(err: any, message?: string): UnexpectedError {
      return new UnexpectedError(err, message);
    }
  }
}
