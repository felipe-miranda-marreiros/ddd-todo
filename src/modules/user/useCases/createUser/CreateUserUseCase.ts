import { UserName } from "./../../domain/value-objects/userName/userName";
import { UserPassword } from "./../../domain/value-objects/userPassword/userPassword";
import { UserEmail } from "./../../domain/value-objects/userEmail/userEmail";
import { UserRepo } from "./../../repo/userRepo";
import { CreateUserDTO } from "./CreateUserDTO";
import { UseCase } from "./../../../../shared/core/UseCase";
import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "./../../../../shared/core/Result";
import { CreateUserErrors } from "./CreateUserError";
import { UserAggregate } from "../../domain/aggregate-root/user/user";

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const { username, password, email } = request;

    const emailOrError = UserEmail.create(email);
    const passwordOrError = UserPassword.create({ value: password });
    const usernameOrError = UserName.create({ name: username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }

    const emailValue: UserEmail = emailOrError.getValue();
    const passwordValue: UserPassword = passwordOrError.getValue();
    const usernameValue: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(emailValue);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(emailValue.value)
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName =
          await this.userRepo.getUserByUserName(usernameValue);

        const userNameTaken = !!alreadyCreatedUserByUserName === true;
        if (userNameTaken) {
          return left(
            new CreateUserErrors.UsernameTakenError(usernameValue.value)
          ) as Response;
        }
      } catch (error) {
        console.log(error);
      }

      const userOrError: Result<UserAggregate> = UserAggregate.create({
        email: emailValue,
        password: passwordValue,
        username: usernameValue,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<UserAggregate>(userOrError.getErrorValue().toString())
        ) as Response;
      }
      const user: UserAggregate = userOrError.getValue();
      await this.userRepo.save(user);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error)) as Response;
    }
  }
}
