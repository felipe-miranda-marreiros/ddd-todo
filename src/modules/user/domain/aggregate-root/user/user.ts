import { UserCreated } from "./../../events/userCreated";
import { Guard } from "./../../../../../shared/core/Guard";
import { UniqueEntityID } from "./../../../../../shared/domain/UniqueEntityID";
import { UserId } from "./../../value-objects/userId/userId";
import { UserPassword } from "./../../value-objects/userPassword/userPassword";
import { UserName } from "./../../value-objects/userName/userName";
import { UserEmail } from "./../../value-objects/userEmail/userEmail";
import { AggregateRoot } from "../../../../../shared/domain/AggregateRoot";
import { UserLoggedIn } from "../../events/userLoggedIn";
import { Result } from "../../../../../shared/core/Result";

type JWTToken = string;

type UserProps = {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  accessToken: JWTToken;
};

export class UserAggregate extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get accessToken(): JWTToken {
    return this.props.accessToken;
  }

  public setAccessToken(token: JWTToken): void {
    this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
  }

  public static create(
    props: UserProps,
    id?: UniqueEntityID
  ): Result<UserAggregate> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.email, argumentName: "email" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<UserAggregate>(guardResult.getErrorValue());
    }
    const isNewUser = !!id === false;
    const user = new UserAggregate({ ...props }, id);
    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }
    return Result.ok<UserAggregate>(user);
  }
}
