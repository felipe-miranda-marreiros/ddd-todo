import { UserEmail } from "./../domain/value-objects/userEmail/userEmail";
import { UserPassword } from "./../domain/value-objects/userPassword/userPassword";
import { UserName } from "./../domain/value-objects/userName/userName";
import { UserAggregate } from "./../domain/aggregate-root/user/user";
import { Mapper } from "../../../shared/infra/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class UserMapper implements Mapper<UserAggregate> {
  public static toDomain(target: any): UserAggregate {
    const userNameOrError = UserName.create({ name: target.username });
    const userEmailOrError = UserEmail.create(target.user_email);
    const userPasswordOrError = UserPassword.create({
      value: target.user_password,
      hashed: true,
    });
    const userOrError = UserAggregate.create(
      {
        username: userNameOrError.getValue(),
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
      },
      new UniqueEntityID(target.base_user_id)
    );
    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : "";
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
  public static async toPersistence(user: UserAggregate): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }
    return {
      base_user_id: user.userId.id.toString(),
      user_email: user.email.value,
      username: user.username.value,
      user_password: password,
    };
  }
}