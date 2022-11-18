import { UserAggregate } from "./../aggregate-root/user/user";
import { IDomainEvent } from "./../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class UserCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: UserAggregate;

  constructor(user: UserAggregate) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }
  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
