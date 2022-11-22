import { AggregateRoot, EventBus } from '@nestjs/cqrs';
import { Test2Event } from '../events/test2Event';
import { TestEvent } from '../events/testEvent';
import { Credentials } from './credentials';

interface CoreCredentialsProps extends Credentials {
  email: string;
  hashedPassword: string;
}
export class CoreCredentials {
  //extends AggregateRoot implements Credentials {
  // dispatch() {
  //   this.apply(new TestEvent('test event'));
  //   this.apply(new Test2Event('test2 event'));
  // }
}
