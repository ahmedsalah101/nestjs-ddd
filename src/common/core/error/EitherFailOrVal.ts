import { DomainError } from './domainError';
export type EitherFailOrVal<F extends DomainError, V> = Fail<F, V> | Val<F, V>;

export class Fail<F, V> {
  readonly value: F;
  constructor(result: F) {
    this.value = result;
  }

  isFail(): this is Fail<F, V> {
    return true;
  }

  //in case of using Fail<F> only then isVal(): this is Val<F>
  ///----------------------------------------------------------
  //which returns false and the returning value will be value of F
  // and in fact the return value is Val of V not F
  //so we need to return the Val<V>
  //so we need Fail to have two types params one for fail type F
  // if returned isFail()
  // and one for other condtion when isVal() which is Val<V>
  //so that the type checjing system will figure out
  // what type comes after if statement conditions
  // a benfit rom this is that type system will enforce u to check before
  //using resValue(something) because something is only a Val if condition
  //is satisfied (isVal)
  isVal(): this is Val<F, V> {
    return false;
  }
}

export class Val<F, V> {
  readonly value: V;
  constructor(result: V) {
    this.value = result;
  }
  isFail(): this is Fail<F, V> {
    return false;
  }

  isVal(): this is Val<F, V> {
    return true;
  }
}

export const resFail = <F extends DomainError, V>(f: F): Fail<F, V> => {
  return new Fail(f);
};

export const resValue = <F extends DomainError, V>(v: V): Val<F, V> => {
  return new Val<F, V>(v);
};
