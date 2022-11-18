import { CreateUserDTO } from "./CreateUserDTO";
import { Response, Request } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserErrors } from "./CreateUserError";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    let dto: CreateUserDTO = req.body as CreateUserDTO;

    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(res, error.getErrorValue());
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.getErrorValue());
          default:
            return this.fail(res, error.getErrorValue());
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
