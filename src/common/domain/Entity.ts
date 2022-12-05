import { EntityID } from './EntityID';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: EntityID;
  protected props: T;
  constructor(props: T, id: EntityID) {
   this._id = id;
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) return false;
    if (!isEntity(object)) return false;
    if (this === object) return true;
    return this._id.equals(object._id);
  }
}
