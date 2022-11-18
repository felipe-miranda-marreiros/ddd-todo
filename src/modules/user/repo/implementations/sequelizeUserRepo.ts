import { UserMapper } from "./../../mappers/userMapper";
import { UserAggregate } from "../../domain/aggregate-root/user/user";
import { UserEmail } from "../../domain/value-objects/userEmail/userEmail";
import { UserName } from "../../domain/value-objects/userName/userName";
import { UserRepo } from "./../userRepo";

export class SequelizeUserRepo implements UserRepo {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const BaseUserModel = this.model;
    const baseUser = await BaseUserModel.findOne({
      where: {
        user_email: userEmail.value,
      },
    });
    return !!baseUser === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<UserAggregate> {
    const BaseUserModel = this.model;
    const baseUser = await BaseUserModel.findOne({
      where: {
        username: userName instanceof UserName ? (<UserName>userName).value : userName,
      },
    });
    if (!!baseUser === false) throw new Error("User not found.");
    return UserMapper.toDomain(baseUser);
  }

  async getUserByUserId(userId: string): Promise<UserAggregate> {
    const BaseUserModel = this.model;
    const baseUser = await BaseUserModel.findOne({
      where: {
        base_user_id: userId,
      },
    });
    if (!!baseUser === false) throw new Error("User not found.");
    return UserMapper.toDomain(baseUser);
  }

  async save(user: UserAggregate): Promise<void> {
    const UserModel = this.model;
    const exists = await this.exists(user.email);

    if (!exists) {
      const targetSequelizeUser = await UserMapper.toPersistence(user);
      await UserModel.create(targetSequelizeUser);
    }
    return;
  }
}
