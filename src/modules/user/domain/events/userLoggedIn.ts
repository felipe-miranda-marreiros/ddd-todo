import { UserAggregate } from "./../aggregate-root/user/user";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class UserLoggedIn implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: UserAggregate;

  constructor(user: UserAggregate) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
