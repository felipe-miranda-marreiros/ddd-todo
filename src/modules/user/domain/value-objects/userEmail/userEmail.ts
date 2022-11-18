import { ValueObject } from "../../../../../shared/domain/ValueObject";
import { Result } from "./../../../../../shared/core/Result";
import { Guard } from "../../../../../shared/core/Guard";
import validator from "validator";

export type UserEmailProps = {
  value: string;
};

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValidEmail(email: string) {
    return validator.isEmail(email);
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<UserEmail> {
    const userEmailResult = Guard.againstNullOrUndefined(email, "email");
    if (userEmailResult.isFailure) {
      return Result.fail<UserEmail>(userEmailResult.getErrorValue());
    }
    if (!this.isValidEmail(email)) {
      return Result.fail<UserEmail>("Insira um email válido.");
    }
    return Result.ok<UserEmail>(
      new UserEmail({ value: this.formatEmail(email) })
    );
  }
}
