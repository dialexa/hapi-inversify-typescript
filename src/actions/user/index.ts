import "reflect-metadata";

import { Container } from 'inversify';

import {
  ICreateUserAction,
  IFindUserAction,
  IUpdateUserAction
} from 'src/types/user';

import CreateUserAction from './create';
import FindUserAction from './find';
import UpdateUserAction from './update';

import Types from './types';

export const bind = (container: Container) => {
  container.bind<ICreateUserAction>(Types.CreateUserAction).to(CreateUserAction).inRequestScope();
  container.bind<IFindUserAction>(Types.FindUserAction).to(FindUserAction).inRequestScope();
  container.bind<IUpdateUserAction>(Types.UpdateUserAction).to(UpdateUserAction).inRequestScope();
}
