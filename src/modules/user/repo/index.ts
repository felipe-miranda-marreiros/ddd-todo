import { BaseUser } from './../../../shared/infra/database/sequelize/models/BaseUser';
import { SequelizeUserRepo } from './implementations/sequelizeUserRepo';

export const userRepo = new SequelizeUserRepo(BaseUser)