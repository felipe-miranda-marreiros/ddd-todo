import bcrypt from "bcrypt";
import { Result } from "./../../../../../shared/core/Result";
import { Guard } from "./../../../../../shared/core/Guard";
import { ValueObject } from "../../../../../shared/domain/ValueObject";

export type UserPasswordProps = {
  value: string;
  hashed?: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  public static minLength = 6;

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(plainText, hashed, (error, compareResult) => {
        if (error) return resolve(false);
        return resolve(compareResult);
      });
    });
  }

  private isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, (error, hash) => {
        if (error) return reject(error);
        resolve(hash);
      });
    });
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      }
      return resolve(this.hashPassword(this.props.value));
    });
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    }
    return this.props.value === plainTextPassword;
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, "password");

    if (propsResult.isFailure) {
      return Result.fail<UserPassword>(propsResult.getErrorValue());
    } else {
      if (!props.hashed) {
        if (!this.isAppropriateLength(props.value)) {
          return Result.fail<UserPassword>(
            "Senha precisa ter no mínimo 6 caracteres."
          );
        }
      }
      return Result.ok<UserPassword>(
        new UserPassword({
          value: props.value,
          hashed: !!props.hashed === true,
        })
      );
    }
  }
}
