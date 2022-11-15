import { Guard } from "../../../../../shared/core/Guard";
import { ValueObject } from "../../../../../shared/domain/ValueObject";
import { Result } from "./../../../../../shared/core/Result";

export type UserNameProps = {
  name: string;
};

export class UserName extends ValueObject<UserNameProps> {
  public static maxLength = 20;
  public static minLength = 5;

  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, "username");
    if (usernameResult.isFailure) {
      return Result.fail<UserName>(usernameResult.getErrorValue());
    }
    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (minLengthResult.isFailure) {
      return Result.fail<UserName>(minLengthResult.getErrorValue());
    }
    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (maxLengthResult.isFailure) {
      return Result.fail<UserName>(maxLengthResult.getErrorValue());
    }
    return Result.ok<UserName>(new UserName(props))
  }
}
