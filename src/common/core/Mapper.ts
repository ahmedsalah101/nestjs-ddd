import { Result } from './Result';

export interface Mapper<T> {
  toDomain(raw: any): Result<T>;
  toPersistence(t: T): any;
}
