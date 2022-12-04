import { shallowEqual } from 'shallow-equal-object';

export abstract class ValueObject<ValType> {
  protected readonly value: ValType;
  constructor(value: ValType) {
    this.value = Object.freeze(value);
  }

  public equals(valObj: ValueObject<ValType>): boolean {
    if (valObj === null || valObj === undefined) return false;
    if (valObj.value === undefined) return false;
    return shallowEqual(this.value, valObj.value);
  }
  abstract toString(): string;
}

// /**
//  *  @param V : raw Value Type
//  *  @param O : ValueObject Class
//  */
// export interface ValueObjectFactory<V, O, E extends Result<IDomainError>> {
//   parse(id: V): EitherFailOrVal<E, Result<O>>;
//   generate?(): O;
// }
