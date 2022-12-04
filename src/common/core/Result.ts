export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public errorValue: T;
  private _value: T;

  protected constructor(isSuccess: boolean, errorValue?: T, value?: T) {
    if (isSuccess && errorValue) {
      throw new Error(
        'InvalidOperation: A failing result must contian an error mesg',
      );
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.errorValue = errorValue;
    this._value = value;
    Object.freeze(this);
  }

  public get successValue(): T {
    if (this.isFailure) {
      return this.errorValue as T;
    }
    return this._value;
  }

  public static ok<K>(value?: K): Result<K> {
    return new Result<K>(true, null, value);
  }

  public static fail<F>(errorValue: any): Result<F> {
    return new Result<F>(false, errorValue);
  }

  // public static combine(results: Result<any>[]): Result<any> {
  //   for (let result of results) {
  //     if (result.isFailure) return result;
  //   }
  //   return Result.ok<any>();
  // }
}

// let dw : Result<DomainError>;
// dw.error
