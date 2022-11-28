import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { Result } from '../core/Result';
import { staticImplements } from '../core/utils';
import { ValueObject, ValueObjectFactory } from './ValueObject';

export type Identifier = string | number;

@staticImplements<ValueObjectFactory<Identifier, EntityID>>()
export class EntityID extends ValueObject<Identifier> {
  private constructor(id: Identifier) {
    super(id);
  }

  toString() {
    return String(this.value);
  }

  static generate(): EntityID {
    return new EntityID(uuid());
  }

  static parse(idValue: Identifier): Result<EntityID> {
    const idSchema = z.union([z.string().uuid(), z.number().int()]);
    const parseResult = idSchema.safeParse(idValue);
    if (parseResult.success === true) {
      return Result.ok<EntityID>(new EntityID(parseResult.data));
    }
    return Result.fail<EntityID>(parseResult.error.flatten().formErrors);
  }
}
