import { Result } from '../Result';
import { DomainError } from './domainError';

export type EitherFailOrVal<F extends Result<DomainError>, V> =
  | Fail<F, V>
  | Val<F, V>;

export class Fail<F, V> {
  readonly value: F;
  constructor(value: F) {
    this.value = value;
  }
  isFail(): this is Fail<F, V> {
    return true;
  }

  isVal(): this is Val<F, V> {
    return false;
  }
}

export class Val<F, V> {
  readonly value: V;
  constructor(value: V) {
    this.value = value;
  }
  isFail(): this is Fail<F, V> {
    return false;
  }

  isVal(): this is Val<F, V> {
    return true;
  }
}

export const resFail = <F extends Result<DomainError>, V>(
  f: F,
): EitherFailOrVal<F, V> => {
  return new Fail(f);
};

export const resValue = <F extends Result<DomainError>, V>(
  v: V,
): EitherFailOrVal<F, V> => {
  return new Val<F, V>(v);
};
