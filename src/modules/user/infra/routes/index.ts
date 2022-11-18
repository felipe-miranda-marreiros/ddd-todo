import { createUserController } from "./../../useCases/index";
import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.post("/", (req: Request, res: Response) =>
  createUserController.execute(req, res)
);

export { userRouter };
