import { userRouter } from "./../../../../modules/user/infra/routes/index";
import { Router } from "express";

const v1Router = Router();

v1Router.use("/users", userRouter);

export { v1Router };
