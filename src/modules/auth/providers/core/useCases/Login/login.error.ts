import { DomainError, Result } from '@common/core';

export namespace LoginError {
  export class CredentialsTakenError extends Result<DomainError> {
    private constructor(credId: string) {
      super(false, {
        message: 'Credentials Already Taken.',
      });
    }
    public static create(credId: string): CredentialsTakenError {
      return new CredentialsTakenError(credId);
    }
  }
}
