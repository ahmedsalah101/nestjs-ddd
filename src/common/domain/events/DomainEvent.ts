import { EntityID } from "../EntityID";

export interface DomainEvent{
    getAggregateId():EntityID;
}