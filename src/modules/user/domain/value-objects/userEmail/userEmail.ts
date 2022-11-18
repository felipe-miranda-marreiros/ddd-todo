import { Result } from "./../../../../../shared/core/Result";
import { ValueObject } from "../../../../../shared/domain/ValueObject";
import validator from "validator"

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
    return validator.isEmail(email)
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<UserEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail<UserEmail>("Insira um email válido.");
    }
    return Result.ok<UserEmail>(
      new UserEmail({ value: this.formatEmail(email) })
    );
  }
}
