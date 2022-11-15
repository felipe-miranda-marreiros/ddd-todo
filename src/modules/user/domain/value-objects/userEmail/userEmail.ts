import { Result } from "./../../../../../shared/core/Result";
import { ValueObject } from "../../../../../shared/domain/ValueObject";

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
    const regexValidateEmail =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexValidateEmail.test(email);
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
