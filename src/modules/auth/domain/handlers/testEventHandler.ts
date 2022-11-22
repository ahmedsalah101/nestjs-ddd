import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Test2Event } from '../events/test2Event';
import { TestEvent } from '../events/testEvent';

@EventsHandler(TestEvent)
export class TestEventHandler implements IEventHandler<TestEvent> {
  handle(event: TestEvent) {
    console.log(event.id);
  }
}


@EventsHandler(Test2Event)
export class Test2EventHandler implements IEventHandler<Test2Event> {
  handle(event: Test2Event) {
    console.log(event.id2 + 'new !');
  }
}