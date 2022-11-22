import { DomainError } from './error';

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string;
  private _value: T;

  protected constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A failing result must contian an error mesg',
      );
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
    Object.freeze(this);
  }

  public getValue(): T {
    if (this.isFailure) {
      throw new Error("can't retireve value from failed operation");
    }
    return this._value;
  }

  public static ok<K>(value?: K): Result<K> {
    return new Result<K>(true, null, value);
  }

  public static fail<F>(error: any): Result<F> {
    return new Result<F>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any>();
  }
}

// let dw : Result<DomainError>;
// dw.error
