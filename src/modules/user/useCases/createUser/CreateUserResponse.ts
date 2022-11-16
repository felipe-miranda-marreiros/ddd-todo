import { AppError } from "../../../../shared/core/AppError";
import { Either, Result } from "./../../../../shared/core/Result";
import { CreateUserErrors } from "./CreateUserError";

export type CreateUserResponse = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
