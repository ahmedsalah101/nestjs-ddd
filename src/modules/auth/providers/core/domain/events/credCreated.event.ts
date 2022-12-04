import { EntityID } from 'src/common/domain/EntityID';
import { DomainEvent } from 'src/common/domain/events/DomainEvent';
import { CoreCredentials } from '../core.credentials';

export class CoreCredCreatedEvent implements DomainEvent {
  public readonly dateTimeOccured: Date;
  constructor(public readonly cred: CoreCredentials) {
    this.dateTimeOccured = new Date();
  }
  getAggregateId(): EntityID {
    return this.cred.id;
  }
}
