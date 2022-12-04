import { EntityID } from 'src/common/domain/EntityID';
import { DomainEvent } from 'src/common/domain/events/DomainEvent';
import { CoreUser } from '../core.user';

export class CoreUserCreatedEvent implements DomainEvent {
  public readonly dateTimeOccured: Date;
  constructor(public readonly user: CoreUser) {
    this.dateTimeOccured = new Date();
  }
  getAggregateId(): EntityID {
    return this.user.id;
  }
}
