import { Result } from '../Result';
import { DomainError } from './domainError';

export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    private constructor(message?: string) {
      super(false, { message: message || 'An unexpected error occured' });
    }

    public static create(message?: string): UnexpectedError {
      return new UnexpectedError(message);
    }
  }

  export class ValidationError extends Result<DomainError> {
    private constructor(message?: string) {
      super(false, { message: message || 'Invalid Value' });
    }

    public static create(message?: string): ValidationError {
      return new ValidationError(message);
    }
  }
}
