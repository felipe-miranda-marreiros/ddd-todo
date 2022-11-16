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
            return this.conflict(res, error.getErrorValue().message);
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok<CreateUserDTO>(res);
      }
    } catch (error) {
      return this.fail(res, error);
    }
  }
}
