import { CreateUserController } from './createUser/CreateUserController';
import { CreateUserUseCase } from './createUser/CreateUserUseCase';
import { userRepo } from './../repo/index';

export const createUserUseCase = new CreateUserUseCase(userRepo)
export const createUserController = new CreateUserController(createUserUseCase)