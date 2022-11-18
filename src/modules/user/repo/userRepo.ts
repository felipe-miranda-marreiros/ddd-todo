import { UserName } from "./../domain/value-objects/userName/userName";
import { UserEmail } from "./../domain/value-objects/userEmail/userEmail";
import { UserAggregate } from "./../domain/aggregate-root/user/user";

export interface UserRepo {
  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<UserAggregate>;
  getUserByUserName(userName: UserName | string): Promise<UserAggregate>;
  save(user: UserAggregate): Promise<void>;
}
